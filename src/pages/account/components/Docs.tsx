import { Grid } from '@mantine/core';
import { DocsList, Doc } from 'features/docs';

export default function Docs() {
  return (
    <Grid>
      <Grid.Col span={{ md: 5 }}>
        <Doc />
      </Grid.Col>
      <Grid.Col span={{ md: 7 }}>
        <DocsList />
      </Grid.Col>
    </Grid>
  );
}
