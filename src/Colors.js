import { createGlobalStyle } from 'styled-components';

export const getCurrentColorPalette = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return { ...colorPalette.default, ...colorPalette.dark };
  }
  return { ...colorPalette.default };
};

export const colorPalette = {
  default: {
    background: '#ffffff',
    background_light: '#AFAFAF19',
    text: '#111315EF',
    link: '#776db4;',
    accent: '#95b5ff',
    accent_dark: '#5788f5',
    menu: {
      background: '#e7e5f5',
      background_dark: '#d2c5f2',
      border: '#b499f0',
    },
    stats: {
      trots: '#EE3D3D',
      users: '#2e750d',
      grid: '#666',
    },
    messages: {
      success: '#8dc572',
      error: '#EE4545E8',
      warning: '#f0ad4e',
      info: '#337ab7',
    },
  },
  dark: {
    background: '#282c34',
    background_light: '#FFFFFF19',
    text: '#ffffff',
    link: '#ffffff',
    accent: '#1358fb',
    accent_dark: '#1441a8',
    menu: {
      background: '#535A853A',
      background_dark: '#362e4c',
    },
    stats: {
      trots: '#FF2A2AEA',
      users: '#46c90a',
    },
  },
};

const Colors = createGlobalStyle`
  :root {
    --background-color: ${colorPalette.default.background};
    --background-light: ${colorPalette.default.background_light};

    --color-text: ${colorPalette.default.text};
    --color-link: ${colorPalette.default.link};
    --color-accent: ${colorPalette.default.accent};
    --color-accent-darker: ${colorPalette.default.accent_dark};
    
    --background-menu-color: ${colorPalette.default.menu.background};
    --border-menu-color: ${colorPalette.default.menu.border};
    --background-menu-color--darker: ${colorPalette.default.menu.background_dark};

    --color-stats-troots: ${colorPalette.default.stats.trots};
    --color-stats-users: ${colorPalette.default.stats.users};
    
    --color-error: ${colorPalette.default.messages.error};
    --color-success: ${colorPalette.default.messages.success};
    --color-warning: ${colorPalette.default.messages.warning};
    --color-info: ${colorPalette.default.messages.info};
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: ${colorPalette.dark.background};
      --background-light: ${colorPalette.dark.background_light};

      --color-text: ${colorPalette.dark.text};
      --color-link: ${colorPalette.dark.link};
      --color-accent: ${colorPalette.dark.accent};
      --color-accent-darker: ${colorPalette.dark.accent_dark};
      
      --background-menu-color: ${colorPalette.dark.menu.background};      
      --background-menu-color--darker: ${colorPalette.dark.menu.background_dark};
       
      --color-stats-troots: ${colorPalette.dark.stats.trots};
      --color-stats-users: ${colorPalette.dark.stats.users};
    }
  }  
`; // <-- End
export default Colors;
