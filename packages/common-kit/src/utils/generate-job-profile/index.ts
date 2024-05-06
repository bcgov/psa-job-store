/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from 'buffer';
import dayjs from 'dayjs';
import {
  BorderStyle,
  Document,
  Footer,
  ISpacingProperties,
  ImageRun,
  PageBorderDisplay,
  PageBorderZOrder,
  Paragraph,
  Table,
  TableBorders,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import BCGovLogo from './bcgov-logo.base64';
import HorizontalRule from './hr.base64';

interface GenerateJobProfileProps {
  jobProfile: Record<string, any>;
  parentJobProfile: Record<string, any> | null;
}

const paragraphSpacing: ISpacingProperties = { before: 140 };

const createHeading = (text: string, allCaps: boolean = true) =>
  new Paragraph({
    indent: {
      left: 160,
      right: 160,
    },
    spacing: paragraphSpacing,
    children: [
      new TextRun({
        allCaps: allCaps,
        bold: true,
        font: 'Calibri',
        size: '12pt',
        text: text,
      }),
    ],
  });

const generateJobProfile = ({ jobProfile, parentJobProfile }: GenerateJobProfileProps) => {
  console.log('parentJobProfile: ', parentJobProfile);

  return new Document({
    sections: [
      {
        properties: {
          page: {
            borders: {
              pageBorderTop: {
                style: BorderStyle.SINGLE,
                size: 1.5 * 8, // 2pt
                color: '244061',
              },
              pageBorderRight: {
                style: BorderStyle.SINGLE,
                size: 2 * 8, // 2pt
                color: '244061',
              },
              pageBorderBottom: {
                style: BorderStyle.SINGLE,
                size: 2 * 8, // 2pt
                color: '244061',
              },
              pageBorderLeft: {
                style: BorderStyle.SINGLE,
                size: 1.5 * 8, // 2pt
                color: '244061',
              },

              pageBorders: {
                display: PageBorderDisplay.ALL_PAGES,
                zOrder: PageBorderZOrder.FRONT,
              },
            },
            margin: {
              top: '0.35in',
              right: '0.35in',
              bottom: '0.35in',
              left: '0.35in',
              footer: '0.35in',
            },
          },
        },
        children: [
          /**
           * Logo, Job Store #
           */
          new Table({
            borders: TableBorders.NONE,
            margins: {
              top: 40,
              right: 160,
              bottom: 20,
              left: 160,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    verticalAlign: VerticalAlign.BOTTOM,
                    margins: {
                      top: 160,
                    },
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: Buffer.from(BCGovLogo, 'base64'),
                            transformation: {
                              width: 215,
                              height: 45,
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.BOTTOM,
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        alignment: 'right',
                        children: [
                          new TextRun({
                            text: 'Job Profile',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            allCaps: true,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: 'right',
                        children: [
                          new TextRun({
                            text: 'Job Store #',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            text: `${jobProfile.number}`,
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
           * HR
           */
          new Paragraph({
            children: [
              new ImageRun({
                data: Buffer.from(HorizontalRule, 'base64'),
                transformation: {
                  width: 727,
                  height: 4,
                },
              }),
            ],
          }),
          /**
           * Title, Classification
           */
          new Table({
            borders: TableBorders.NONE,
            margins: {
              top: 40,
              right: 160,
              bottom: 20,
              left: 160,
            },
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Title:   ',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            text: jobProfile.title?.value,
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
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Classification:   ',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            characterSpacing: 5.76,
                            text:
                              jobProfile.classifications.length > 0
                                ? jobProfile.classifications[0].classification.name
                                : '',
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
          // Job Overview
          createHeading('Program Overview'),
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                font: 'Calibri',
                italics: true,
                size: '12pt',
                text: jobProfile.program_overview.value,
              }),
            ],
          }),
          // Job Overview
          createHeading('Job Overview'),
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                font: 'Calibri',
                italics: true,
                size: '12pt',
                text: jobProfile.overview.value,
              }),
            ],
          }),

          // Accountabilities
          createHeading('Accountabilities'),
          ...jobProfile.accountabilities
            .filter((obj: Record<string, any>) => !obj.disabled)
            .map(
              (obj: Record<string, any>) =>
                new Paragraph({
                  indent: {
                    right: 160,
                  },
                  spacing: paragraphSpacing,
                  bullet: {
                    level: 0,
                  },
                  children: [
                    new TextRun({
                      font: 'Calibri',
                      size: '12pt',
                      text: obj.text,
                    }),
                  ],
                }),
            ),
          createHeading('Job Requirements'),
          ...(jobProfile.education.length > 0
            ? [
                createHeading('Education and Experience', false),
                ...jobProfile.education
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.text,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.job_experience.length > 0
            ? [
                createHeading('Related Experience may include', false),
                ...jobProfile.job_experience
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.text,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.professional_registration_requirements.length > 0
            ? [
                createHeading('Professional Registration Requirements', false),
                ...jobProfile.professional_registration_requirements
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.value,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.preferences.length > 0
            ? [
                createHeading('Preferences', false),
                ...jobProfile.preferences
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.value,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.knowledge_skills_abilities.length > 0
            ? [
                createHeading('Knowledge, Skills and Abilities', false),
                ...jobProfile.knowledge_skills_abilities
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.value,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.willingness_statements.length > 0
            ? [
                createHeading('Willingness statements or provisos', false),
                ...jobProfile.willingness_statements
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.value,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),

          ...(jobProfile.security_screenings.length > 0
            ? [
                createHeading('Security Screenings', false),
                ...jobProfile.security_screenings
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.text,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          ...(jobProfile.optional_requirements.length > 0
            ? [
                createHeading('Optional Requirements', false),
                ...jobProfile.optional_requirements
                  .filter((obj: Record<string, any>) => !obj.disabled)
                  .map(
                    (obj: Record<string, any>) =>
                      new Paragraph({
                        indent: {
                          right: 160,
                        },
                        spacing: paragraphSpacing,
                        bullet: {
                          level: 0,
                        },
                        children: [
                          new TextRun({
                            font: 'Calibri',
                            size: '12pt',
                            text: obj.value,
                          }),
                        ],
                      }),
                  ),
              ]
            : []),
          createHeading('Indigenous Relations and Behavioural Competencies'),

          ...jobProfile.behavioural_competencies
            .filter((obj: Record<string, any>) => !obj.disabled)
            .map(
              (obj: Record<string, any>) =>
                new Paragraph({
                  indent: {
                    right: 160,
                  },
                  spacing: paragraphSpacing,
                  bullet: {
                    level: 0,
                  },
                  children: [
                    new TextRun({
                      bold: true,
                      font: 'Calibri',
                      size: '12pt',
                      text: `${obj.behavioural_competency.name} `,
                    }),
                    new TextRun({
                      font: 'Calibri',
                      size: '12pt',
                      text: obj.behavioural_competency.description,
                    }),
                  ],
                }),
            ),
        ],
        footers: {
          default: new Footer({
            children: [
              new Table({
                alignment: 'center',
                borders: {
                  top: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                  },
                  right: {
                    style: BorderStyle.NONE,
                  },
                  bottom: {
                    style: BorderStyle.NONE,
                  },
                  left: {
                    style: BorderStyle.NONE,
                  },
                  insideHorizontal: {
                    style: BorderStyle.NONE,
                  },
                  insideVertical: {
                    style: BorderStyle.NONE,
                  },
                },
                margins: {
                  right: 20,
                  left: 20,
                },
                width: {
                  size: 96,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                bold: true,
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: 'Job Family',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: `${parentJobProfile?.jobFamilies[0].jobFamily?.name}`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                bold: true,
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: 'Job Stream',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: `${parentJobProfile?.streams[0]?.stream?.name}`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                bold: true,
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: 'Role',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: `${
                                  parentJobProfile?.role_type?.name != null ? parentJobProfile?.role_type?.name : ''
                                }`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children: [
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                bold: true,
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: 'Revised Date',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                font: 'Arial Narrow',
                                size: '8pt',
                                text:
                                  parentJobProfile != null
                                    ? `${dayjs(parentJobProfile.updated_at).format('MMM d, YYYY')}`
                                    : '',
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
};

export default generateJobProfile;
