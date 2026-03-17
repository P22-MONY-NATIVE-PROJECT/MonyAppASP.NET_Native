import React from 'react';
import { SvgXml } from 'react-native-svg';

const logoBlackXml = `
<svg width="118" height="124" viewBox="0 0 118 124" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M55.7656 119.109V66.3307H76.9707V119.109M20.2606 119.109V93.5043H41.4658V119.109M92.126 119.109V41.1126H113.331V119.109M4.33124 77.9212L49.6953 32.5572L65.1358 46.4699L106.242 5.38354M105.305 24.1647L107.2 7.01316C107.235 6.65222 107.189 6.28796 107.066 5.94679C106.943 5.60562 106.746 5.29608 106.489 5.04062C106.232 4.78517 105.921 4.5902 105.578 4.46983C105.236 4.34946 104.872 4.30671 104.511 4.34469L87.3797 6.23909" stroke="#0E3E3E" stroke-width="8.6625" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const logoGreenXml = `
<svg width="118" height="124" viewBox="0 0 118 124" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M55.7656 119.109V66.3307H76.9708V119.109M20.2607 119.109V93.5043H41.4659V119.109M92.1261 119.109V41.1126H113.331V119.109M4.3313 77.9212L49.6953 32.5572L65.1358 46.4699L106.243 5.38354M105.305 24.1647L107.2 7.01316C107.235 6.65223 107.189 6.28797 107.066 5.9468C106.944 5.60563 106.747 5.29608 106.489 5.04063C106.232 4.78517 105.921 4.5902 105.579 4.46983C105.236 4.34946 104.872 4.30671 104.511 4.3447L87.3798 6.23909" stroke="#00D09E" stroke-width="8.6625" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const LogoBlack = ({ size = 100 }: { size?: number }) => (
    <SvgXml xml={logoBlackXml} width={size} height={size} />
);

export const LogoGreen = ({ size = 100 }: { size?: number }) => (
    <SvgXml xml={logoGreenXml} width={size} height={size} />
);