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
  positionRequest?: Record<string, any> | null;
  supervisorProfile?: Record<string, any> | null;
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

function flattenObject(obj: any, parentKey = '', result: Record<string, any> = {}): Record<string, any> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(value)) {
        const arrayValues = value
          .filter((item) => {
            if (item && typeof item === 'object') {
              if ('disabled' in item) {
                return !item.disabled;
              } else return true;
            } else return true;
          })
          .map((item) => {
            if (item && typeof item === 'object') {
              if ('text' in item) {
                return item.text;
              } else if ('value' in item) {
                return item.value;
              } else {
                return item;
              }
            } else {
              return item;
            }
          });
        result[newKey] = arrayValues;
      } else if (value && typeof value === 'object') {
        if ('text' in value) {
          result[newKey] = value.text;
        } else if ('value' in value) {
          result[newKey] = value.value;
        } else {
          flattenObject(value, newKey, result);
        }
      } else {
        result[newKey] = String(value);
      }
    }
  }
  return result;
}

function mapToFlatRecord(input: any): Record<string, any> {
  if (typeof input === 'string') {
    input = JSON.parse(input);
  }
  return flattenObject(input);
}

const generateJobProfile = ({ jobProfile, positionRequest, supervisorProfile }: GenerateJobProfileProps) => {
  const transformedJobProfile = mapToFlatRecord(jobProfile);
  // console.log('jobProfile: ', jobProfile);
  // console.log('transformedJobProfile',transformedJobProfile);
  // console.log('supervisorProfile', supervisorProfile);
  // console.log('positionRequest', positionRequest);
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
                            text: `${transformedJobProfile.number}`,
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                        ],
                      }),
                      ...(positionRequest
                        ? [
                            new Paragraph({
                              alignment: 'right',
                              children: [
                                new TextRun({
                                  text: 'Position #',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                                new TextRun({
                                  text: `${positionRequest.position_number.toString().padStart(8, '0')}`,
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                              ],
                            }),
                          ]
                        : []),
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
                            text: transformedJobProfile.title,
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                        ],
                      }),
                      ...(supervisorProfile
                        ? [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'Ministry:   ',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                                new TextRun({
                                  text: supervisorProfile.ministry,
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                              ],
                            }),
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'Supervisor:   ',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                                new TextRun({
                                  text: supervisorProfile.positionDescription ?? '',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                              ],
                            }),
                          ]
                        : []),
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
                              transformedJobProfile.classifications.length > 0
                                ? transformedJobProfile.classifications[0].classification.name
                                : '',
                            bold: true,
                            font: 'Calibri',
                            size: '12pt',
                            smallCaps: true,
                          }),
                        ],
                      }),

                      ...(positionRequest
                        ? [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'Branch:   ',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                                new TextRun({
                                  text: positionRequest.additional_info.branch,
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                              ],
                            }),
                          ]
                        : []),

                      ...(supervisorProfile
                        ? [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'Supervisor Position #',
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                                new TextRun({
                                  text: supervisorProfile.positionNumber,
                                  bold: true,
                                  font: 'Calibri',
                                  size: '12pt',
                                  smallCaps: true,
                                }),
                              ],
                            }),
                          ]
                        : []),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Program Overview
          ...(transformedJobProfile.program_overview && transformedJobProfile.program_overview.trim() != ''
            ? [
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
                      text: transformedJobProfile.program_overview,
                    }),
                  ],
                }),
              ]
            : []),

          // Job Overview
          ...(transformedJobProfile.overview && transformedJobProfile.overview.trim() != ''
            ? [
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
                      text: transformedJobProfile.overview,
                    }),
                  ],
                }),
              ]
            : []),

          // Accountabilities
          ...(transformedJobProfile.accountabilities && transformedJobProfile.accountabilities.length > 0
            ? [
                createHeading('Accountabilities'),
                ...transformedJobProfile.accountabilities.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          createHeading('Job Requirements'),
          ...(transformedJobProfile.education && transformedJobProfile.education.length > 0
            ? [
                createHeading('Education and Experience', false),
                ...transformedJobProfile.education.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.job_experience && transformedJobProfile.job_experience.length > 0
            ? [
                createHeading('Related Experience may include', false),
                ...transformedJobProfile.job_experience.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.professional_registration_requirements &&
          transformedJobProfile.professional_registration_requirements.length > 0
            ? [
                createHeading('Professional Registration and Certification Requirements', false),
                ...transformedJobProfile.professional_registration_requirements.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.preferences && transformedJobProfile.preferences.length > 0
            ? [
                createHeading('Preferences', false),
                ...transformedJobProfile.preferences.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.knowledge_skills_abilities &&
          transformedJobProfile.knowledge_skills_abilities.length > 0
            ? [
                createHeading('Knowledge, Skills and Abilities', false),
                ...transformedJobProfile.knowledge_skills_abilities.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.willingness_statements && transformedJobProfile.willingness_statements.length > 0
            ? [
                createHeading('Willingness statements or provisos', false),
                ...transformedJobProfile.willingness_statements.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.security_screenings && transformedJobProfile.security_screenings.length > 0
            ? [
                createHeading('Security Screenings', false),
                ...transformedJobProfile.security_screenings.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.optional_requirements && transformedJobProfile.optional_requirements.length > 0
            ? [
                createHeading('Other Requirements', false),
                ...transformedJobProfile.optional_requirements.map(
                  (obj: string) =>
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
                          text: obj,
                        }),
                      ],
                    }),
                ),
              ]
            : []),

          ...(transformedJobProfile.behavioural_competencies &&
          transformedJobProfile.behavioural_competencies.length > 0
            ? [
                createHeading('Indigenous Relations and Behavioural Competencies'),
                ...transformedJobProfile.behavioural_competencies.map(
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
              ]
            : []),
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
                          // new Paragraph({
                          //   spacing: paragraphSpacing,
                          //   children: [
                          //     new TextRun({
                          //       bold: true,
                          //       font: 'Arial Narrow',
                          //       size: '8pt',
                          //       text: 'Job Family',
                          //     }),
                          //   ],
                          // }),
                          // new Paragraph({
                          //   spacing: paragraphSpacing,
                          //   children: [
                          //     new TextRun({
                          //       font: 'Arial Narrow',
                          //       size: '8pt',
                          //       // text: `${transformedJobProfile?.jobFamilies[0].jobFamily?.name}`,
                          //     }),
                          //   ],
                          // }),
                        ],
                      }),
                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children: [
                          // new Paragraph({
                          //   spacing: paragraphSpacing,
                          //   children: [
                          //     new TextRun({
                          //       bold: true,
                          //       font: 'Arial Narrow',
                          //       size: '8pt',
                          //       text: 'Job Stream',
                          //     }),
                          //   ],
                          // }),
                          // new Paragraph({
                          //   spacing: paragraphSpacing,
                          //   children: [
                          //     new TextRun({
                          //       font: 'Arial Narrow',
                          //       size: '8pt',
                          //       // text: `${transformedJobProfile?.streams[0]?.stream?.name}`,
                          //     }),
                          //   ],
                          // }),
                        ],
                      }),

                      new TableCell({
                        width: {
                          size: 20,
                          type: WidthType.PERCENTAGE,
                        },
                        children:
                          transformedJobProfile?.role_type?.name != null
                            ? [
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
                                        transformedJobProfile?.role_type?.name != null
                                          ? transformedJobProfile?.role_type?.name
                                          : ''
                                      }`,
                                    }),
                                  ],
                                }),
                              ]
                            : [],
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
                                  transformedJobProfile != null
                                    ? `${dayjs(transformedJobProfile.updated_at).format('MMM d, YYYY')}`
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
