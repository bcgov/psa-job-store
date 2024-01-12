import {
  BorderStyle,
  Document,
  Footer,
  ISpacingProperties,
  Packer,
  PageBorderDisplay,
  PageBorderOffsetFrom,
  PageBorderZOrder,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { saveAs } from 'file-saver';

export const DocxComponent = () => {
  const border = {
    style: BorderStyle.SINGLE,
    size: 2 * 8, // 2pt
    color: '244061',
  };

  const paragraphSpacing: ISpacingProperties = { before: 115 };

  //   const doc = new Document({
  //     sections: [
  //         {
  //             children: [
  //                 new Table({
  //                     rows: [
  //                         new TableRow({
  //                             children: [
  //                                 new TableCell({
  //                                     children: [new Paragraph({}), new Paragraph({})],
  //                                     verticalAlign: VerticalAlign.CENTER,
  //                                 }),
  //                                 new TableCell({
  //                                     children: [new Paragraph({}), new Paragraph({})],
  //                                     verticalAlign: VerticalAlign.CENTER,
  //                                 }),
  //                                 new TableCell({
  //                                     children: [new Paragraph({ text: "bottom to top" }), new Paragraph({})],
  //                                     textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
  //                                 }),
  //                                 new TableCell({
  //                                     children: [new Paragraph({ text: "top to bottom" }), new Paragraph({})],
  //                                     textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
  //                                 }),
  //                             ],
  //                         }),
  //                         new TableRow({
  //                             children: [
  //                                 new TableCell({
  //                                     children: [
  //                                         new Paragraph({
  //                                             text: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
  //                                             heading: HeadingLevel.HEADING_1,
  //                                         }),
  //                                     ],
  //                                 }),
  //                                 new TableCell({
  //                                     children: [
  //                                         new Paragraph({
  //                                             text: "This text should be in the middle of the cell",
  //                                         }),
  //                                     ],
  //                                     verticalAlign: VerticalAlign.CENTER,
  //                                 }),
  //                                 new TableCell({
  //                                     children: [
  //                                         new Paragraph({
  //                                             text: "Text above should be vertical from bottom to top",
  //                                         }),
  //                                     ],
  //                                     verticalAlign: VerticalAlign.CENTER,
  //                                 }),
  //                                 new TableCell({
  //                                     children: [
  //                                         new Paragraph({
  //                                             text: "Text above should be vertical from top to bottom",
  //                                         }),
  //                                     ],
  //                                     verticalAlign: VerticalAlign.CENTER,
  //                                 }),
  //                             ],
  //                         }),
  //                     ],
  //                 }),
  //             ],
  //         },
  //     ],
  // });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            borders: {
              pageBorderBottom: border,
              pageBorderLeft: border,
              pageBorderRight: border,
              pageBorderTop: border,

              pageBorders: {
                display: PageBorderDisplay.ALL_PAGES,
                offsetFrom: PageBorderOffsetFrom.TEXT,
                zOrder: PageBorderZOrder.FRONT,
              },
            },
            margin: {
              top: '0.5in',
              right: '0.5in',
              bottom: '0.5in',
              left: '0.5in',
            },
          },
        },
        children: [
          /**
           * Title, Classification
           */
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: '4.25in',
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Title:   ',
                            bold: true,
                            font: 'Calibri',
                            size: '14pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            text: 'Program Assistant',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: '4.25in',
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Classification:   ',
                            bold: true,
                            font: 'Calibri',
                            size: '14pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            characterSpacing: 5.76,
                            text: 'Clerk 9',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /**
           * Job Overview
           */
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Job Overview',
                bold: true,
                font: 'Calibri',
                size: '12pt',
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'To provide a variety of office administrative, secretarial, and financial support services for the branch and coordinate the day-to-day priorities of the manager, including providing liaison with ministry executive offices.',
                font: 'Calibri',
                size: '12pt',
                italics: true,
              }),
            ],
          }),
          /**
           * Accountabilities
           */
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Accountabilities',
                bold: true,
                font: 'Calibri',
                size: '12pt',
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Required:',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          // Bullets
          new Paragraph({
            spacing: paragraphSpacing,
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Types, formats, and proofreads',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Optional:',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          /**
           * Job Requirements
           */
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Job Requirements',
                bold: true,
                font: 'Calibri',
                size: '12pt',
                allCaps: true,
              }),
            ],
          }),
          // Bullets
          new Paragraph({
            spacing: paragraphSpacing,
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Secondary School graduation (Dogwood, GED) and 6 months related experience; OR',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Related experience includes the following:',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          // Bullets
          new Paragraph({
            spacing: paragraphSpacing,
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Experience working in an office setting.',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          /**
           * Behavioural Competencies
           */
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Behavioural Competencies',
                bold: true,
                font: 'Calibri',
                size: '12pt',
                allCaps: true,
              }),
            ],
          }),
          // Bullets
          new Paragraph({
            spacing: paragraphSpacing,
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Concern for Order ',
                font: 'Calibri',
                size: '12pt',
                bold: true,
              }),
              new TextRun({
                text: 'reflects an underlying drive to reduce uncertainty in the surrounding environment. It is expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          new Paragraph({
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                text: 'Related experience includes the following:',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
          // Bullets
          new Paragraph({
            spacing: paragraphSpacing,
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Experience working in an office setting.',
                font: 'Calibri',
                size: '12pt',
              }),
            ],
          }),
        ],
        footers: {
          default: new Footer({
            children: [
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: {
                          size: '1.7in',
                          type: WidthType.DXA,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Career Group',
                                bold: true,
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Administrative Services',
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: '1.7in',
                          type: WidthType.DXA,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Job Family',
                                bold: true,
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Secretarial',
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: '1.7in',
                          type: WidthType.DXA,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Job Stream',
                                bold: true,
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: '',
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: '1.7in',
                          type: WidthType.DXA,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Role',
                                bold: true,
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Admin/Operational',
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: '1.7in',
                          type: WidthType.DXA,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                text: 'Revised Date',
                                bold: true,
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,

                            children: [
                              new TextRun({
                                text: 'November 2023',
                                font: 'Arial',
                                size: '8pt',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
      },
    ],
  });

  const generate = () => {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'job-profile.docx');
    });
  };

  return (
    <div>
      <h1>Docx Component</h1>
      <button onClick={generate}>Generate Job Profile</button>
    </div>
  );
};
