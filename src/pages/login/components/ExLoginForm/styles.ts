import { GenerateStyle, ProAliasToken } from '@ant-design/pro-components';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface LoginFormToken extends ProAliasToken {
  componentCls: string;
}

const genLoginFormStyle: GenerateStyle<LoginFormToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-container': {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: '100%',
        // paddingInline: 32,
        // paddingBlock: 24,
        overflow: 'auto',
        background: 'inherit',
      },
      '&-top': {
        textAlign: 'center',
      },
      '&-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        // height: '44px',
        lineHeight: '44px',
        flexDirection: 'column',
        a: {
          textDecoration: 'none',
        },
      },
      '&-title': {
        position: 'relative',
        insetBlockStart: '2px',
        color: token.colorTextSecondary,
        fontWeight: '600',
        fontSize: '33px',
      },
      '&-logo': {
        width: '400px',
        height: '150px',
        marginInlineEnd: '16px',
        verticalAlign: 'top',
        img: {
          width: '100%',
        },
      },
      '&-desc': {
        marginBlockStart: '12px',
        marginBlockEnd: '40px',
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
      },
      '&-main': {
        minWidth: '328px',
        maxWidth: '500px',
        margin: '0 auto',
        '&-other': {
          marginBlockStart: '24px',
          lineHeight: '22px',
          textAlign: 'start',
        },
      },
    },
    '@media (min-width: @screen-md-min)': {
      [`${token.componentCls}-container`]: {
        paddingInline: 0,
        paddingBlockStart: 32,
        paddingBlockEnd: 24,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('LoginForm', (token) => {
    const loginFormToken: LoginFormToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genLoginFormStyle(loginFormToken)];
  });
}
