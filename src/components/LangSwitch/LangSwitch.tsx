import { useTranslation } from 'react-i18next';
import { IconLanguage } from '@tabler/icons-react';
import { Button, rem } from '@mantine/core';

export default function LangSwitch() {
  const { t, i18n } = useTranslation();

  const toggle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  return (
    <Button
      onClick={toggle}
      variant='outline'
      size='xs'
      px={rem(8)}
      rightSection={<IconLanguage size={14} />}
    >
      {t('lang')}
    </Button>
  );
}
