/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Buffer } from 'buffer';
import dayjs from 'dayjs';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  ISpacingProperties,
  ImageRun,
  Packer,
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
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import hrComponent from './hr.component';
import logoComponent from './logo.component';

export interface DownloadJobProfileComponentProps {
  jobProfile: Record<string, any> | null;
}

export const DownloadJobProfileComponent = ({
  children,
  jobProfile,
}: DownloadJobProfileComponentProps & React.PropsWithChildren) => {
  const [trigger, { data, isLoading }] = useLazyGetJobProfilesQuery();
  const [defaultJobProfile, setDefaultJobProfile] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (jobProfile && !data) {
      trigger({ where: { number: { equals: jobProfile.number } } });
    }

    if (data && data.jobProfilesCount > 0) {
      setDefaultJobProfile(data.jobProfiles[0]);
    }
  }, [jobProfile, data, trigger]);

  const paragraphSpacing: ISpacingProperties = { before: 140 };

  const doc = new Document({
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
                            data: Buffer.from(logoComponent, 'base64'),
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
                            text: `${jobProfile?.number}`,
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
                data: Buffer.from(hrComponent, 'base64'),
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
                            size: '14pt',
                            smallCaps: true,
                          }),
                          new TextRun({
                            text: jobProfile?.title?.value,
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
                        alignment: AlignmentType.CENTER,
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
                            text:
                              (jobProfile?.classifications ?? []).length > 0
                                ? jobProfile?.classifications[0].classification.code
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
          /**
           * Job Overview Heading
           */
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                allCaps: true,
                bold: true,
                font: 'Calibri',
                size: '12pt',
                text: 'Job Overview',
              }),
            ],
          }),
          /**
           * Job Overview Content
           */
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
                text: jobProfile?.overview.value,
              }),
            ],
          }),
          /**
           * Accountabilities Heading
           */
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                allCaps: true,
                bold: true,
                font: 'Calibri',
                size: '12pt',
                text: 'Accountabilities',
              }),
            ],
          }),
          /**
           * Accountabilities Content
           */
          ...(jobProfile != null && jobProfile.accountabilities.required.length > 0
            ? [
                new Paragraph({
                  indent: {
                    left: 160,
                    right: 160,
                  },
                  spacing: paragraphSpacing,
                  children: [
                    new TextRun({
                      font: 'Calibri',
                      size: '12pt',
                      text: 'Required:',
                    }),
                  ],
                }),
                ...jobProfile.accountabilities.required.map((accountability: Record<string, any>) => {
                  return new Paragraph({
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
                        text: accountability.value,
                      }),
                    ],
                  });
                }),
              ]
            : []),
          ...(jobProfile != null && jobProfile.accountabilities.optional.length > 0
            ? [
                new Paragraph({
                  indent: {
                    left: 160,
                    right: 160,
                  },
                  spacing: paragraphSpacing,
                  children: [
                    new TextRun({
                      font: 'Calibri',
                      size: '12pt',
                      text: 'Optional:',
                    }),
                  ],
                }),
                ...jobProfile.accountabilities.optional.map((accountability: Record<string, any>) => {
                  return new Paragraph({
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
                        text: accountability.value,
                      }),
                    ],
                  });
                }),
              ]
            : []),
          /**
           * Job Requirements Heading
           */
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                allCaps: true,
                bold: true,
                font: 'Calibri',
                size: '12pt',
                text: 'Job Requirements',
              }),
            ],
          }),
          /**
           * Job Requirements Content
           */
          ...(jobProfile != null &&
            jobProfile.requirements.map((requirement: Record<string, any>) => {
              return new Paragraph({
                indent: {
                  right: 160,
                },
                spacing: paragraphSpacing,
                bullet: {
                  level: 0,
                },
                children: [
                  new TextRun({
                    text: `${requirement.value} `,
                    font: 'Calibri',
                    size: '12pt',
                  }),
                ],
              });
            })),
          /**
           * Behavioural Competencies Heading
           */
          new Paragraph({
            indent: {
              left: 160,
              right: 160,
            },
            spacing: paragraphSpacing,
            children: [
              new TextRun({
                allCaps: true,
                bold: true,
                font: 'Calibri',
                size: '12pt',
                text: 'Behavioural Competencies',
              }),
            ],
          }),
          /**
           * Behavioural Competencies Content
           */
          ...(jobProfile != null &&
            jobProfile.behavioural_competencies.map((competency: Record<string, any>) => {
              return new Paragraph({
                spacing: paragraphSpacing,
                bullet: {
                  level: 0,
                },
                children: [
                  new TextRun({
                    bold: true,
                    font: 'Calibri',
                    size: '12pt',
                    text: `${competency.behavioural_competency.name} `,
                  }),
                  new TextRun({
                    font: 'Calibri',
                    size: '12pt',
                    text: competency.behavioural_competency.description,
                  }),
                ],
              });
            })),
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
                        margins: {
                          bottom: 20,
                        },
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
                                text: 'Career Group',
                              }),
                            ],
                          }),
                          new Paragraph({
                            spacing: paragraphSpacing,
                            children: [
                              new TextRun({
                                font: 'Arial Narrow',
                                size: '8pt',
                                text: `${defaultJobProfile?.jobFamilies[0]?.job_family?.name}`, // todo: support multiple. This was career_group, got replaced with job_family
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
                                text: `${defaultJobProfile?.jobFamilies[0].jobFamily?.name}`,
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
                                text: `${defaultJobProfile?.streams[0]?.stream?.name}`,
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
                                text: `${defaultJobProfile?.role?.name}`,
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
                                text: `${dayjs(defaultJobProfile?.updated_at).format('MMM d, YYYY')}`,
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

  return children != null ? (
    isLoading ? (
      <Spin spinning={isLoading} />
    ) : defaultJobProfile == null ? (
      <span>disabled</span>
    ) : (
      <span onClick={generate}>{children}</span>
    )
  ) : (
    <Button icon={<DownloadOutlined />} loading={isLoading} disabled={defaultJobProfile == null} onClick={generate}>
      Download Job Profile
    </Button>
  );
};
