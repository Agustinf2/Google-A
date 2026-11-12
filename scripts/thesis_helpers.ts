import {
  Paragraph,
  TextRun,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  PageBreak,
} from 'docx';

export function createCell(
  text: string,
  widthPct: number,
  isHeader = false,
  bold = false,
  align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { fill: isHeader ? '012D1D' : 'FFFFFF' },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text,
            bold: isHeader || bold,
            color: isHeader ? 'FFFFFF' : '1D1B19',
            font: 'Arial',
            size: isHeader ? 19 : 18, // 9.5pt or 9pt
          }),
        ],
      }),
    ],
  });
}

export function createParagraph(
  text: string,
  options: {
    bold?: boolean;
    italic?: boolean;
    color?: string;
    size?: number;
    spaceAfter?: number;
    spaceBefore?: number;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  } = {}
): Paragraph {
  const {
    bold = false,
    italic = false,
    color = '1D1B19',
    size = 22, // 11pt default
    spaceAfter = 140,
    spaceBefore = 0,
    align = AlignmentType.JUSTIFIED,
  } = options;

  return new Paragraph({
    alignment: align,
    spacing: { after: spaceAfter, before: spaceBefore, line: 276 }, // 1.15 line spacing
    children: [
      new TextRun({
        text,
        bold,
        italics: italic,
        color,
        font: 'Arial',
        size,
      }),
    ],
  });
}

export function createHeading1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 28, // 14pt
        color: '012D1D',
      }),
    ],
  });
}

export function createHeading2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 26, // 13pt
        color: '006C48',
      }),
    ],
  });
}

export function createHeading3(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 22, // 11pt
        color: '012D1D',
      }),
    ],
  });
}

export function createBullet(title: string, text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 100 },
    bullet: { level: 0 },
    children: [
      new TextRun({ text: `${title}: `, bold: true, font: 'Arial', size: 21, color: '012D1D' }),
      new TextRun({ text, font: 'Arial', size: 21, color: '333333' }),
    ],
  });
}

export function createPageBreak(): Paragraph {
  return new Paragraph({
    children: [new PageBreak()],
  });
}
