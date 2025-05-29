import {
  Card,
  Text,
  Badge,
  Image,
  Stack,
  Flex,
  Avatar,
  rem,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { IconMapPin, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { API_SERVER, DEFAULT_COMPANY_AVATAR } from 'shared/constants';
import { ICompany } from '../../../types';
import classes from './CompanyCard.module.scss';

type CompanyCardProps = {
  company: ICompany;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    createdAt,
    firstName,
    lastName,
    companyEmployeesCount,
    // companyHiresCount,
    companyLogo,
    companyName,
    companyOffices,
  } = company;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.companies}/${_id}`);
  };

  return (
    <Card
      shadow='sm'
      radius={0}
      onClick={navigateHandler}
      className={classes.card}
    >
      <Card.Section>
        <Image
          fallbackSrc={DEFAULT_COMPANY_AVATAR}
          src={`${API_SERVER}/${companyLogo}`}
          w='100%'
          h={200}
        />

        <Badge className={classes.time} color='primary'>
          {formatDT(createdAt)}
        </Badge>
      </Card.Section>

      <Stack gap={rem(4)} mt={rem(12)} className={classes.content}>
        <Flex align='center' gap={rem(8)}>
          <Avatar src={`${API_SERVER}/${avatar}`} />
          <Text>
            {firstName} {lastName}
          </Text>
        </Flex>

        <Flex mt={rem(4)}>
          <Text size='lg' c='primary' fw={500}>
            {companyName}
          </Text>
          {/* {companyHiresCount && <Badge color='pink'>Has hires</Badge>} */}
        </Flex>

        <Flex align='center' gap={4}>
          <IconMapPin size={20} stroke='secondary' />
          <Text c='secondary' lh='sm'>
            {companyOffices}
          </Text>
        </Flex>

        <Flex align='center' gap={4}>
          <IconUsersGroup size={20} stroke='secondary' />
          <Text c='secondary' lh='sm'>
            {companyEmployeesCount}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
}
