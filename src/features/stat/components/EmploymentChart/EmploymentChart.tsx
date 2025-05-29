import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { BarChart } from '@mantine/charts';
import {
  selectEmploymentStat,
  selectEmploymentStatIsLoading,
  selectEmploymentError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function EmploymentChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectEmploymentStat);
  const loading = useAppSelector(selectEmploymentStatIsLoading);
  const error = useAppSelector(selectEmploymentError);

  return (
    <ChartTemplate
      title={t('graph_employment')}
      loading={loading}
      error={error}
    >
      <BarChart
        h={360}
        data={data}
        dataKey='employment'
        tooltipAnimationDuration={200}
        withYAxis={false}
        withLegend
        series={[
          { name: 'Vacancies', color: 'teal.9' },
          { name: 'Candidates', color: 'cyan.9' },
        ]}
      />
    </ChartTemplate>
  );
}
