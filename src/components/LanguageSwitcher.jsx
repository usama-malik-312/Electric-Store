import React from 'react';
import { Select, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    ];

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <Space>
            <GlobalOutlined style={{ fontSize: '16px' }} />
            <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                style={{ width: 120 }}
                size="small"
            >
                {languages.map((lang) => (
                    <Option key={lang.code} value={lang.code}>
                        <Space>
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                        </Space>
                    </Option>
                ))}
            </Select>
        </Space>
    );
};

export default LanguageSwitcher; 