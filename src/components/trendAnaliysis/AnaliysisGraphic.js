import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import LanguageChart from './LanguageChart';
import TopicChart from './TopicChart';
import LanguagePieChart from './LanguagePieChart';
import TopicPieChart from './TopicPieChart';
import LicenseBarChart from './LicenseBarChart';
import LicensePieChart from './LicensePieChart';
import styles from './AnaliysisGraphic.css';

const AnaliysisGraphic = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [languageData, setLanguageData] = useState(null);
    const [topicData, setTopicData] = useState(null);
    const [licenseData, setLicenseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.user) return;

            setIsLoading(true);
            try {
                const response1 = await axiosPrivate.get('/api/v1/repo-counts');
                const response2 = await axiosPrivate.get('/api/v1/count-by-topic');
                const response3 = await axiosPrivate.get('/api/v1/repo-counts-license');

                const languageData = response1.data;
                const topicData = response2.data;
                const licenseData = response3.data;

                setLanguageData(languageData);
                setTopicData(topicData);
                setLicenseData(licenseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [auth?.user, axiosPrivate]);

    return (
        <div className={styles.analysisContainer}>
            {isLoading ? (
                <p>Grafikler yükleniyor...</p>
            ) : (
                <div className={styles.analysisContainer}>
                    <div className={styles.chartWrapper}>
                        {languageData && (
                            <div className={styles.chartContainer}>
                                <h2 className={styles.chartTitle}></h2>
                                <LanguageChart data={languageData} />
                            </div>
                        )}

                        {languageData && (
                            <div className={styles.chartContainer} style={{ marginTop: 40 }}>
                                <h2 className={styles.chartTitle}></h2>
                                <LanguagePieChart data={languageData} />
                            </div>
                        )}

                        {topicData && (
                            <div className={styles.chartContainer} style={{ marginTop: 40 }}>
                                <h2 className={styles.chartTitle}></h2>
                                <TopicChart data={topicData} />
                            </div>
                        )}

                        {topicData && (
                            <div className={styles.chartContainer} style={{ marginTop: 40 }}>
                                <h2  className={styles.chartTitle}></h2>
                                <TopicPieChart data={topicData} />
                            </div>
                        )}

                        {licenseData && (
                            <div className={styles.chartContainer} style={{ marginTop: 40 }}>
                                <h2 className={styles.chartTitle}></h2>
                                <LicenseBarChart data={licenseData} />
                            </div>
                        )}

                        {licenseData && (
                            <div className={styles.chartContainer} style={{ marginTop: 40 }}>
                                <h2 className={styles.chartTitle}></h2>
                                <LicensePieChart data={licenseData} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnaliysisGraphic;
