import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ForceGraph3D } from 'react-force-graph';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import * as THREE from 'three';
import * as d3 from 'd3';

import { Dropdown } from '@components/Dropdown/Dropdown';
import { translate } from '@utils/helpers/i18n';

import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TableStyles from '@components/Table/Table.styles';
import * as PastelIdDetailsStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';

import {
  SCALE_EXPONENT_OPTIONS,
  CLUSTERING_OPTIONS,
  NODE_IMPORTANCE_OPTIONS,
  getUncompressedData,
  getAltDecompressZstdCompressedData,
} from './SenseMap.helpers';
import * as Styles from './SenseMap.styles';

type TNode = {
  creator_pastelid: string;
  datetime_fingerprint_added_to_database: string;
  drawing_probability: number;
  file_hash: string;
  hentai_probability: number;
  id: number;
  img_link: string;
  index: number;
  is_pastel_openapi_request: number;
  is_rare_on_internet: number;
  min_number_of_exact_matches_in_page: number;
  open_api_subsetid: string;
  open_nsfw_score: number;
  overall_rareness_score: number;
  pastel_block_hash: string;
  pastel_block_height: string;
  sexy_probability: number;
  utc_timestamp: string;
  vx: number;
  vy: number;
  vz: number;
  x: number;
  y: number;
  z: number;
};

const PastelSlider = withStyles({
  root: {
    height: 16,
  },
  thumb: {
    height: 22,
    width: 22,
    backgroundColor: '#0E80F5',
    border: 0,
    borderRadius: 50,
    marginTop: -4,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 16,
    borderRadius: 6,
    opacity: 0.38,
    background: '#3F9AF7',
  },
  rail: {
    height: 16,
    borderRadius: 6,
    background: '#3F9AF7',
  },
})(Slider);

const HIGHLIGHT_IMG_COLOR = '#FFB1B1';
const HIGHLIGHT_BORDER_COLOR = 'red';
const DEFAULT_NODE_SIZE = 12;
const MAX_NODE_SIZE = 30;
const MIN_NODE_SIZE = 3;
// eslint-disable-next-line
const spriteCache: any = {};
const nodeHighlightObjs = new Map();
const uncompressed_graph_analysis_df_obj = getAltDecompressZstdCompressedData();

const SenseMap: React.FC = () => {
  const [clustering, setClustering] = useState('');
  const [nodeImportance, setNodeImportance] = useState('');
  const [scaleExponent, setScaleExponent] = useState(SCALE_EXPONENT_OPTIONS[3].value);
  const [linkStrength, setLinkStrength] = useState(false);
  const [density, setDensity] = useState(0.02);

  const handleClusteringChange = (event: SelectChangeEvent) => {
    setClustering(event.target.value as string);
  };

  const handleNodeImportanceChange = (event: SelectChangeEvent) => {
    setNodeImportance(event.target.value as string);
  };

  const handleScaleExponentChange = (event: SelectChangeEvent) => {
    setScaleExponent(event.target.value as string);
  };

  const graphData = () => {
    const data = getUncompressedData(density);
    return {
      nodes: data.nodes,
      links: data.links,
    };
  };

  // eslint-disable-next-line
  const handleDensityChange = (event: any, newValue: number | number[]) => {
    setDensity(newValue as number);
  };

  const handleLinkStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkStrength(event.target.checked);
  };

  const linkStrengthColorScale = d3.scalePow([0, 1], ['rgba(200, 190, 210, 0.7)', '#000']);

  const getNodeCluster = (n: TNode) => {
    return uncompressed_graph_analysis_df_obj.graph_stats_table_df[
      `nk_${clustering}_communities_vector`
    ][n.file_hash];
  };

  const getClustering = () => {
    if (!clustering) {
      return {
        d3Force: 'link',
        nodeLabel: '',
      };
    }

    return {
      d3Force: 'cluster',
      nodeLabel: (n: TNode) => {
        return `<div class="node-color">Cluster: ${getNodeCluster(n)}</div>`;
      },
    };
  };

  const getMetricVal = (node: TNode) =>
    uncompressed_graph_analysis_df_obj.graph_stats_table_df[nodeImportance][node.file_hash];

  const getForceGraph3DOptions = () => {
    return {
      height: window.innerHeight - 150,
      width: window.innerWidth - 62,
      backgroundColor: '#ffffff00',
      cooldownTicks: 6000,
      warmupTicks: 200,
      d3VelocityDecay: 0.5,
      linkColor: () => {
        return linkStrengthColorScale(linkStrength ? 1 : 0);
      },
      linkOpacity: linkStrength ? 0.35 : 0.18,
      linkWidth: 2,
      linkDirectionalParticleWidth: 1,
      linkDirectionalParticleSpeed: 0.008,
      linkDirectionalParticles: 4,
      nodeThreeObject: (node: TNode) => {
        const { img_link } = node;
        const imgTexture = new THREE.TextureLoader().load(img_link);
        const imgSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: imgTexture }));

        // highlighted image
        const highlightImgSprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: imgTexture, color: HIGHLIGHT_IMG_COLOR }),
        );

        // highlighting border
        if (!spriteCache?.highlight) {
          // cache for re-use
          const highlightBorderEl = document.createElement('canvas');
          const ctx = highlightBorderEl.getContext('2d');
          const canvasRes = 800;
          const bw = 0.025; // border width, relative to img size
          const sw = 0.25; // shadow size, relative to img size

          highlightBorderEl.width = canvasRes * (1 + sw);
          highlightBorderEl.height = canvasRes * (1 + sw);
          if (ctx) {
            ctx.scale(canvasRes, canvasRes);
            ctx.translate(sw / 2, sw / 2);

            ctx.lineWidth = bw;
            ctx.lineJoin = 'round';
            ctx.strokeStyle = HIGHLIGHT_BORDER_COLOR;
            ctx.shadowColor = 'palegoldenrod';
            ctx.shadowBlur = (sw / 3) * canvasRes;
            ctx.strokeRect(bw / 2, bw / 2, 1 - bw, 1 - bw);
            ctx.clearRect(bw, bw, 1 - bw * 2, 1 - bw * 2); // hollow out shadow
          }

          const spriteMaterial = new THREE.SpriteMaterial({
            map: new THREE.Texture(highlightBorderEl),
          });
          spriteMaterial.depthWrite = false; // make sprite background transparent
          if (spriteMaterial.map?.needsUpdate) {
            spriteMaterial.map.needsUpdate = true;
          }

          spriteCache.highlight = new (class extends THREE.Sprite {})(spriteMaterial);
          spriteCache.highlight.scale.set(1 + bw + sw, 1 + bw + sw);
        }
        const highlightBorderSprite = spriteCache.highlight.clone();

        const highlightGroup = new THREE.Group();
        highlightGroup.add(highlightImgSprite);
        highlightGroup.add(highlightBorderSprite);

        highlightGroup.visible = false; // hide by default
        nodeHighlightObjs.set(node, highlightGroup);

        const nodeGroup = new THREE.Group();
        nodeGroup.add(imgSprite);
        nodeGroup.add(highlightGroup);
        if (nodeImportance || scaleExponent) {
          if (nodeImportance) {
            const vals = graphData().nodes.map(getMetricVal);
            const max = d3.max(vals);
            const min = d3.min(vals);
            const sizeScale = d3
              .scalePow()
              .exponent(Number(scaleExponent))
              .domain([Number(min), Number(max)])
              .range([MIN_NODE_SIZE, MAX_NODE_SIZE]);
            const size = sizeScale(getMetricVal(node));
            nodeGroup.scale.set(size, size, size);
          } else {
            nodeGroup.scale.set(DEFAULT_NODE_SIZE, DEFAULT_NODE_SIZE, DEFAULT_NODE_SIZE);
          }
        } else {
          nodeGroup.scale.set(DEFAULT_NODE_SIZE / 2, DEFAULT_NODE_SIZE / 2, DEFAULT_NODE_SIZE / 2);
        }
        return nodeGroup;
      },
      onNodeHover: (d: TNode | null, prevD: TNode | null) => {
        const highlightObj = nodeHighlightObjs.get(d);
        const prevHighlightObj = nodeHighlightObjs.get(prevD);
        highlightObj && (highlightObj.visible = true);
        prevHighlightObj && (prevHighlightObj.visible = false);
      },
      onNodeRightClick: (node: TNode) => {
        const out_url = `https://sensedemo.pastel.network/sense_requests/${node.file_hash}`;
        window.open(out_url);
      },
      ...getClustering(),
    };
  };

  return (
    <Styles.Wrapper>
      <BlockDetailsStyles.GridStyle item className="content-wrapper">
        <TableStyles.BlockWrapper className="mb-12 min-h-60vh block-wrapper">
          <PastelIdDetailsStyles.BlockWrapper className="ticket-title-wrapper">
            <PastelIdDetailsStyles.BlockTitle className="ticket-title-section">
              {translate('pages.senseMap.pageTitle')}
            </PastelIdDetailsStyles.BlockTitle>
            <PastelIdDetailsStyles.FilterBlock>
              <Styles.FilterWrapper className="filter-item">
                <Box className="filter-item">
                  <Box className="slider-filter">
                    <Box className="slider-value-wrapper">
                      <Typography component="span" className="slider-label">
                        {translate('pages.senseMap.density')}:
                      </Typography>
                    </Box>
                    <Box className="slider-wrapper">
                      <PastelSlider
                        value={density}
                        onChange={handleDensityChange}
                        aria-labelledby="discrete-slider-small-steps"
                        step={0.005}
                        min={0.02}
                        max={0.025}
                        valueLabelDisplay="auto"
                        className="slider"
                      />
                    </Box>
                  </Box>
                  <Box className="link-strength">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedLinkStrength"
                          checked={linkStrength}
                          onChange={handleLinkStrengthChange}
                        />
                      }
                      label={translate('pages.senseMap.linkStrength')}
                    />
                  </Box>
                </Box>
                <Dropdown
                  value={clustering}
                  onChange={handleClusteringChange}
                  options={CLUSTERING_OPTIONS}
                  label={`${translate('pages.senseMap.clustering')}:`}
                  classNameWrapper="filter-dropdown clustering"
                />
                <Dropdown
                  value={nodeImportance}
                  onChange={handleNodeImportanceChange}
                  options={NODE_IMPORTANCE_OPTIONS}
                  label={`${translate('pages.senseMap.nodeImportance')}:`}
                  classNameWrapper="filter-dropdown node-importance"
                />
                <Dropdown
                  value={scaleExponent}
                  onChange={handleScaleExponentChange}
                  options={SCALE_EXPONENT_OPTIONS}
                  label={`${translate('pages.senseMap.scaleExponent')}:`}
                  classNameWrapper="filter-dropdown scale-exponent"
                />
              </Styles.FilterWrapper>
            </PastelIdDetailsStyles.FilterBlock>
          </PastelIdDetailsStyles.BlockWrapper>
        </TableStyles.BlockWrapper>
        <Box className="main-content">
          <ForceGraph3D graphData={graphData()} {...getForceGraph3DOptions()} />
        </Box>
      </BlockDetailsStyles.GridStyle>
    </Styles.Wrapper>
  );
};

export default SenseMap;
