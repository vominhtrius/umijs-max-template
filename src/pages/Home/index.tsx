import { theme } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import styles from './index.less';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';

const { useToken } = theme;
const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { token } = useToken();
  console.log('theme', token);
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
