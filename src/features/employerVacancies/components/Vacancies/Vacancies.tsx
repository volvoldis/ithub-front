import { useEffect } from 'react';
import { Box, Title, Stack } from '@mantine/core';
import { CardSkeleton, ErrorBox } from 'components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import VacancyCard from './VacancyCard';
import {
  selectVacancies,
  setVacancy,
  selectVacanciesIsLoading,
  selectVacanciesError,
} from '../../employerVacanciesSlice';
import { getVacancies } from '../../services';

export default function EmployerVacancies() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const vacancies = useAppSelector(selectVacancies);
  const loading = useAppSelector(selectVacanciesIsLoading);
  const error = useAppSelector(selectVacanciesError);

  const setVacancyHandler = (id: string) => () => {
    dispatch(setVacancy(id));
    navigate(ROUTES.profileAddEditVacancy);
  };

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <CardSkeleton key={i} horizontal />
  ));

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  return (
    <Box component='section'>
      {error ? (
        <ErrorBox msg={error} />
      ) : (
        <Stack>
          {loading ? (
            skeletons
          ) : vacancies?.length > 0 ? (
            vacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy._id}
                vacancy={vacancy}
                onEdit={setVacancyHandler(vacancy._id)}
              />
            ))
          ) : (
            <Title order={3} ta='center'>
              {t('you_have_no_vacancies_yet')}
            </Title>
          )}
        </Stack>
      )}
    </Box>
  );
}
