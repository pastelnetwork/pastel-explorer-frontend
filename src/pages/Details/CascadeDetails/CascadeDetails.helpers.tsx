import doc from '@assets/icons/filetypes/doc.svg';
import gif from '@assets/icons/filetypes/gif.svg';
import jpg from '@assets/icons/filetypes/jpg.svg';
import mp3 from '@assets/icons/filetypes/mp3.svg';
import pdf from '@assets/icons/filetypes/pdf.svg';
import png from '@assets/icons/filetypes/png.svg';
import svg from '@assets/icons/filetypes/svg.svg';
import txt from '@assets/icons/filetypes/txt.svg';
import unknown from '@assets/icons/filetypes/unknown.svg';
import xls from '@assets/icons/filetypes/xls.svg';
import zip from '@assets/icons/filetypes/zip.svg';
import avi from '@assets/icons/filetypes/avi.svg';
import mov from '@assets/icons/filetypes/mov.svg';
import mxf from '@assets/icons/filetypes/mxf.svg';
import mp4 from '@assets/icons/filetypes/mp4.svg';

import { Img } from './CascadeDetails.styles';

export const getFileIcon = (file_type: string) => {
  switch (file_type) {
    case 'image/jpeg':
      return <Img src={jpg} alt="jpg" />;
    case 'application/msword':
      return <Img src={doc} alt="doc" />;
    case 'image/gif':
      return <Img src={gif} alt="gif" />;
    case 'audio/mpeg':
      return <Img src={mp3} alt="mp3" />;
    case 'application/pdf':
      return <Img src={pdf} alt="pdf" />;
    case 'image/svg+xml':
      return <Img src={svg} alt="svg" />;
    case 'text/plain':
      return <Img src={txt} alt="txt" />;
    case 'application/vnd.ms-excel':
      return <Img src={xls} alt="xls" />;
    case 'image/png':
      return <Img src={png} alt="png" />;
    case 'video/mp4':
      return <Img src={mp4} alt="mp4" />;
    case 'video/mxf':
      return <Img src={mxf} alt="mxf" />;
    case 'video/avi':
      return <Img src={avi} alt="avi" />;
    case 'video/mov':
      return <Img src={mov} alt="mov" />;
    case 'application/zip':
    case 'application/x-gzip':
      return <Img src={zip} alt="zip" />;
    default:
      return <Img src={unknown} alt="unknown" />;
  }
};

export const getCascadeVolumeIcon = (file_name: string) => {
  if (!file_name) {
    return <Img src={unknown} alt="unknown" />;
  }
  const parseFileName = file_name.split('.')
  const fileExtension = parseFileName[parseFileName.length - 1]
  switch (fileExtension) {
    case 'jpg':
      return <Img src={jpg} alt="jpg" />;
    case 'doc':
    case 'docx':
      return <Img src={doc} alt="doc" />;
    case 'gif':
      return <Img src={gif} alt="gif" />;
    case 'mp3':
      return <Img src={mp3} alt="mp3" />;
    case 'pdf':
      return <Img src={pdf} alt="pdf" />;
    case 'svg':
      return <Img src={svg} alt="svg" />;
    case 'txt':
      return <Img src={txt} alt="txt" />;
    case 'xls':
    case 'xlsx':
      return <Img src={xls} alt="xls" />;
    case 'png':
      return <Img src={png} alt="png" />;
    case 'mp4':
      return <Img src={mp4} alt="mp4" />;
    case 'mxf':
      return <Img src={mxf} alt="mxf" />;
    case 'avi':
      return <Img src={avi} alt="avi" />;
    case 'mov':
      return <Img src={mov} alt="mov" />;
    case 'zip':
    case 'tar':
    case 'rar':
    case 'gz':
    case '7z':
      return <Img src={zip} alt="zip" />;
    default:
      return <Img src={unknown} alt="unknown" />;
  }
};
