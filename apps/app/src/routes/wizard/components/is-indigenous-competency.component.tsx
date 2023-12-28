import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile-types';

interface Props {
  competency: BehaviouralCompetency;
}

export const IsIndigenousCompetency = ({ competency }: Props) => {
  const { data } = useGetBehaviouralCompetenciesQuery();

  const isIndigenousCompetency = () => {
    const match = data?.behaviouralComptencies.find((d) => d.id === competency.id);
    return match && match.type === 'INDIGENOUS' ? true : false;
  };

  return isIndigenousCompetency() === true ? '*' : '';
};
