import { MIME_TYPES } from '@mantine/dropzone';

export const getDocType = (type: string): string => {
  switch (type) {
    case MIME_TYPES.csv:
      return 'text/csv';
    case MIME_TYPES.pdf:
      return 'pdf';
    case MIME_TYPES.doc:
      return 'doc';
    case MIME_TYPES.docx:
      return 'docs';
    case MIME_TYPES.xls:
      return 'xls';
    case MIME_TYPES.xlsx:
      return 'xlsx';
    case MIME_TYPES.pptx:
      return 'pptx';
    case MIME_TYPES.ppt:
      return 'ppt';
    default:
      return '';
  }
};
