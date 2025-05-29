import { useAppSelector } from 'store/hooks';
import { Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { PieChart } from '@mantine/charts';
import {
  selectEnglishStat,
  selectEnglishStatIsLoading,
  selectEnglishError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function EnglshChartsChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectEnglishStat);
  const loading = useAppSelector(selectEnglishStatIsLoading);
  const error = useAppSelector(selectEnglishError);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ChartTemplate
          title={t('candidates_english')}
          loading={loading}
          error={error}
        >
          <PieChart data={data.candidates} size={300} withTooltip />
        </ChartTemplate>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ChartTemplate
          title={t('required_english')}
          loading={loading}
          error={error}
        >
          <PieChart data={data.vacancies} size={300} withTooltip />
        </ChartTemplate>
      </Grid.Col>
    </Grid>
  );
}
