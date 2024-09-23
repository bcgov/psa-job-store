/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IdVersion } from '../../redux/services/graphql-api/job-profile-types';
import { useGetJobProfileMetaQuery } from '../../redux/services/graphql-api/job-profile.api';

// Define the type for your breadcrumb item

export interface VersionSelectProps {
  id: string;
  version: string | null;
  selectVersionCallback?: (selectedVersion: IdVersion) => void;
}

export const VersionSelect = ({ id, version, selectVersionCallback }: VersionSelectProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  // const [selectedVersion, setSelectedVersion] = useState<IdVersion | undefined>({ id: 0, version: 0 });
  const { data: jobProfileMeta } = useGetJobProfileMetaQuery(parseInt(id ?? -1));
  const versions = jobProfileMeta?.jobProfileMeta.versions;
  // setSelectedVersion({ id: parseInt(id ?? '-1'), version: parseInt(version ?? '-1') });
  // const currentVersion =
  //   versions?.length ?? 0 > 0
  //     ? versions
  //         ?.map((jp: { version: any }) => jp.version)
  //         .reduce(function (p: number, v: number) {
  //           return p > v ? p : v;
  //         }, '')
  //     : undefined;
  // useEffect(() => {
  //   if (versions) {
  //     // const versionParam = searchParams.get('version');
  //     // const selectedVersion = id && version
  //     //   ? versions.versions.find(
  //     //       (v: IdVersion) => v.id == parseInt(params.id ?? '') && v.version == parseInt(versionParam ?? '1'),
  //     //     )
  //     //   : [...versions.versions].sort((a, b) => {
  //     //       return b.version - a.version;
  //     //     })[0];
  //     setSelectedVersion({ id: parseInt(id ?? '-1'), version: parseInt(version ?? '-1') });
  //     // setIsCurrentVersion(selectedVersion?.version === currentVersion);
  //   }
  // }, [currentVersion, id, version, versions]);

  const jobProfileVersions: { label: string; value: any; icon: any }[] = versions
    ? versions?.map((version: IdVersion) => ({
        label: 'Version ' + version.version,
        value: version?.id + '-' + version?.version,
        icon: <TagOutlined />,
      }))
    : [];

  const onChange = (value: string) => {
    const id_version = value.split('-');
    // setIsCurrentVersion(id_version[1] === currentVersion);
    value &&
      selectVersionCallback &&
      selectVersionCallback({ id: parseInt(id_version[0] ?? ''), version: parseInt(id_version[1] ?? '') });

    id_version[0] && searchParams.set('id', id_version[0]);
    id_version[1] && searchParams.set('version', id_version[1]);
    navigate(
      {
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const showVersions = (versions?.length ?? 0) > 0;

  // const renderButtons = () =>
  //   showVersions || selectedVersion?.id !== 0 ? (
  //     <div style={{ display: 'flex', gap: '10px' }}>
  //       {showVersions && selectedVersion && (
  //         <Select
  //           filterSort={(optionA: { label: any }, optionB: { label: any }) =>
  //             (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
  //           }
  //           options={jobProfileVersions}
  //           onChange={onChange}
  //           value={selectedVersion?.id + '-' + selectedVersion?.version}
  //         >
  //           <Button>
  //             Select Version
  //             <DownOutlined />
  //           </Button>
  //         </Select>
  //       )}
  //     </div>
  //   ) : undefined;

  return (
    showVersions && (
      <Select
        filterSort={(optionA: { label: any }, optionB: { label: any }) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={jobProfileVersions}
        onChange={onChange}
        value={
          id +
          '-' +
          (version ?? (versions ? [...versions].sort((a, b) => b.version - a.version)[0].version : undefined))
        }
      >
        <Button>
          Select Version
          <DownOutlined />
        </Button>
      </Select>
    )
  );
};
