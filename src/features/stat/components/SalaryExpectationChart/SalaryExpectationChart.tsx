import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { LineChart } from '@mantine/charts';
import {
  selectSalaryExpectationStat,
  selectSalaryExpectationLoading,
  selectSalaryExpectationError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function SalaryExpectationChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectSalaryExpectationStat);
  const loading = useAppSelector(selectSalaryExpectationLoading);
  const error = useAppSelector(selectSalaryExpectationError);

  return (
    <ChartTemplate
      title={t('average_salary_expectation')}
      loading={loading}
      error={error}
    >
      <LineChart
        h={360}
        data={data}
        dataKey='level'
        withLegend
        unit='$'
        tooltipAnimationDuration={200}
        series={[{ name: 'Salary', color: 'red.6' }]}
      />
    </ChartTemplate>
  );
}
