
import React, { useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from "@mui/icons-material/Search";
import cookies from 'js-cookie'
import { ColorModeContext, tokens } from "../../theme";


const languages = [
    {
        code: 'de',
        name: 'Deutsch',
        country_code: 'de',
    },
    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },
    
];

const Topbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { i18n, t } = useTranslation();

    useEffect(() => {
        document.title = t('app_title');
        }, [currentLanguage, t]);


    const onChangeLang = (e) =>
    {
        const langCode = e.target.value;
        i18n.changeLanguage(langCode);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"/>
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/* ICONS */}
            {/*className={classNames('dropdown-item', {*/}
            {/*    disabled: currentLanguageCode === code,*/}
            {/*})}*/}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <select defaultValue={i18n.language} onChange={onChangeLang}  >
                    {
                        languages.map(({ code, name }) => (
                            <option
                                key={code}
                                value={code}
                            >{name}</option>
                        ))
                    }
                </select>
                <IconButton>
                    <LanguageIcon >
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <span className="dropdown-item-text">{t('language')}</span>
                            </li>
                            {languages.map(({ code, name, country_code }) => (
                                <li key={country_code}>
                                    <a
                                        href="#"
                                        
                                        onClick={() => {
                                            i18next.changeLanguage(code);
                                        }}
                                    >
                                        <span
                                            className={`flag-icon flag-icon-${country_code} mx-2`}
                                            style={{
                                                opacity: currentLanguageCode === code ? 0.5 : 1,
                                            }}
                                        ></span>
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </LanguageIcon>
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;