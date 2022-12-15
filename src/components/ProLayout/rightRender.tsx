import React from 'react';

import { Avatar, Dropdown, Spin } from 'antd';
import { InitDataType, RuntimeConfig } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import { HeaderProps } from '@ant-design/pro-components';

import { IConfigFromPlugins } from '@@/core/pluginConfig';
import { FormattedMessage, SelectLang } from '@@/plugin-locale';

export function getRightRenderContent(
  headerProps: HeaderProps,
  dom: JSX.Element,
  opts: {
    userConfig: IConfigFromPlugins['layout'];
    runtimeConfig: RuntimeConfig;
    loading: InitDataType['loading'];
    initialState: InitDataType['initialState'];
    setInitialState: InitDataType['setInitialState'];
  },
): JSX.Element {
  if (opts.runtimeConfig.rightRender) {
    return opts.runtimeConfig.rightRender(
      opts.initialState,
      opts.setInitialState,
      opts.runtimeConfig,
    );
  }

  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={
          opts.initialState?.user?.avatar ||
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        }
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">
        {opts.initialState?.user?.display_name}
      </span>
    </span>
  );

  if (opts.loading) {
    return (
      <div className="umi-plugin-layout-right">
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    );
  }

  const langMenu = {
    className: 'umi-plugin-layout-menu',
    selectedKeys: [],
    items: [
      {
        key: 'logout',
        label: (
          <>
            <LogoutOutlined />
            <FormattedMessage id="menu.account.logout" />
          </>
        ),
        onClick: () => {
          opts?.runtimeConfig?.logout?.(opts.initialState);
        },
      },
    ],
  };

  return (
    <div className="umi-plugin-layout-right anticon">
      {opts.runtimeConfig.logout ? (
        <Dropdown
          menu={langMenu}
          overlayClassName="umi-plugin-layout-container"
        >
          {avatar}
        </Dropdown>
      ) : (
        avatar
      )}
      <SelectLang />
    </div>
  );
}
