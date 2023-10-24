import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton, Typography, Box  } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography, CustomSlider } from './styles';
import { useLanguage } from '../../../components/hooks/UseLanguage';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';

interface LanguageSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	languages: [
        {
            _id: string;
			language: string;
			level: number;
		}
    ];
}

interface LanguageSectionProps {
    language_section: LanguageSectionForm; 
}

const LanguageSection: React.FC<LanguageSectionProps> = ({ language_section }) => {
    const [languageData, setLanguageData] = useState<LanguageSectionForm>({
        _id: language_section._id,
        resumeId: language_section.resumeId || '',
        field_name: language_section.field_name || 'Languages',
        languages: language_section.languages || [],
    });

    const { addLanguage, updateLanguage, deleteLanguage, deleteLanguageSection } = useLanguage();
	const [editLanguageField, setEditLanguageField] = useState(false);
	const [languageFieldLoading, setLanguageFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(languageData.languages.map(() => false));
    const [secondsArray, setSecondsArray] = useState(languageData.languages.map(() => 2));
    const [showDialogLanguageSection, setShowDialogLanguageSection] = useState(false);
    const [showDialogLanguage, setShowDialogLanguage] = useState(false);
    const [deletionIndex, setDeletionIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(
        languageData.languages.map(() => false)
    );

    const toggleDetails = (index: number) => {
        setShowDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index] = !newDetails[index];
            return newDetails;
        });
    };
    
    const levelMarks = ['Novice', 'Beginner', 'Intermediate', 'Fluent', 'Expert / Native'];

    const handleChangeLevel = (index: number, newValue: number) => {
        setLanguageData(prevData => {
            const updatedLanguages = [...prevData.languages];
            updatedLanguages[index].level = newValue;
    
            return {
                ...prevData,
                languages: updatedLanguages,
            };
        });
        setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = true;
            return updatedPhases;
        });

        setSecondsArray(prevSeconds => {
            const updatedSeconds = [...prevSeconds];
            updatedSeconds[index] = 2;
            return updatedSeconds;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "field_name") {
            setLanguageData({
                ...languageData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setLanguageData(prevData => {
                const updatedLanguages = [...prevData.languages];
                updatedLanguages[index] = {
                    ...updatedLanguages[index],
                    [fieldName]: value,
                };
    
                return {
                    ...prevData,
                    languages: updatedLanguages,
                };
            });
            setEditingPhases(prevPhases => {
                const updatedPhases = [...prevPhases];
                updatedPhases[index] = true;
                return updatedPhases;
            });
    
            setSecondsArray(prevSeconds => {
                const updatedSeconds = [...prevSeconds];
                updatedSeconds[index] = 2;
                return updatedSeconds;
            });
        }
	};	
	
	const languageUpdate = async (index: number) => {
		await updateLanguage(languageData.resumeId, languageData.languages[index]._id, languageData.languages[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setLanguageFieldLoading(true);
		await updateLanguage(languageData.resumeId, languageData._id, languageData);
		setEditLanguageField(false);
		setLanguageFieldLoading(false);
	};

    const handleAddLanguage = async () =>{
        const language_section = await addLanguage(languageData.resumeId);
        setLanguageData(language_section);
        setShowDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[updatedDetails.length] = true;
            return updatedDetails;
        });
    };

	const handleDeleteLanguageSection = async () =>{
		await deleteLanguageSection(languageData.resumeId);
        setShowDialogLanguageSection(false);
	};

	const handleDeleteLanguage = async () =>{
		const language_section = await deleteLanguage(languageData.resumeId, languageData.languages[deletionIndex]._id);
        setLanguageData(language_section);
        setShowDialogLanguage(false);
	};

    const handleShowDialogLanguageSection = () =>{
        setShowDialogLanguageSection(prev => !prev);
    }
    const handleShowDialogLanguage = (index: number) =>{
        setDeletionIndex(index);
        setShowDialogLanguage(true);
    }

	useEffect(() => {
        const intervals = secondsArray.map((seconds, index) => {
            return setInterval(() => {
                setSecondsArray(prevSeconds => {
                    const updatedSeconds = [...prevSeconds];
                    updatedSeconds[index] = prevSeconds[index] - 1;
                    return updatedSeconds;
                });
            }, 1000);
        });
    
        secondsArray.forEach((seconds, index) => {
            if (seconds <= 0 && editingPhases[index]) {
                languageUpdate(index);
            }
        });
    
        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, [secondsArray, editingPhases]);

  return (
    <Container style={{ padding: 0 }} maxWidth="xs">
		<CustomPaper
			sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30vw' }}
		>
			<Grid container spacing={2}>
				{editLanguageField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
						<CustomTextField
							fullWidth
							label="Languages Field Name"
							variant="filled"
							name="field_name"
							value={languageData.field_name}
							onChange={handleChange}
						/>
						{languageFieldLoading?
							<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
						:(
                            <>
                                <IconButton onClick={handleChangeFieldName} sx={{ '&:focus': { outline: 'none' }}} >
                                    <Check
                                        sx={{
                                            color: '#6499E9',
                                            fontSize: 30,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <IconButton onClick={handleShowDialogLanguageSection} sx={{ '&:focus': { outline: 'none' }}} >
                                    <Delete
                                        sx={{
                                            color: '#D71313',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                            </>
						)}
					</Grid>
				):(
					<Grid item xs={12}  sx={{ display: 'flex', alignItems:'center' }}>
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{languageData.field_name}</CustomTypography>
                        <IconButton onClick={() => setEditLanguageField(true)} sx={{ '&:focus': { outline: 'none' }}} >
                            <Edit
                                sx={{
                                    color: '#6499E9',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleShowDialogLanguageSection} sx={{ '&:focus': { outline: 'none' }}} >
                            <Delete
                                sx={{
                                    color: '#D71313',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <AlertDialog open={showDialogLanguageSection} handleCloseDialog={handleShowDialogLanguageSection} handleAgreement={handleDeleteLanguageSection}/>
					</Grid>
				)}
                {languageData.languages.map((language, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #D8D9DA', padding: '16px', margin: '0 0 16px 16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', height: '4rem' }}>
                                <CustomTypography variant="body1" onClick={() => toggleDetails(index)} sx={{ 
                                    marginLeft: 0, 
                                    cursor: 'pointer' ,
                                    '&:hover': { color: '#687EFF' }
                                    }}>
                                    {language.language}
                                    <IconButton sx={{ '&:focus': { outline: 'none' }}} >
                                        {showDetails[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </CustomTypography>
                                <IconButton onClick={() => handleShowDialogLanguage(index)} sx={{ '&:focus': { outline: 'none' }}} >
                                    <DeleteOutline
                                        sx={{
                                            color: '#FF6969',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <AlertDialog open={showDialogLanguage} handleCloseDialog={() =>setShowDialogLanguage(false)} handleAgreement={handleDeleteLanguage}/>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Language"
                                            variant="filled"
                                            name={`language;-;${index}`}
                                            value={language.language}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Box sx={{ 
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <Typography>level:</Typography>
                                        <Typography sx={{
                                            marginLeft: '8px',
                                            color:  language.level === 1 ? '#FF6464' :
                                                    language.level === 2 ? '#E25E3E' :
                                                    language.level === 3 ? '#FFBD67' :
                                                    language.level === 4 ? '#5BE7A9' :
                                                                        '#8E8FFA',
                                        }}>
                                            {levelMarks[language.level - 1]}
                                        </Typography>
                                    </Box>
                                    <CustomSlider
                                        value={language.level}
                                        min={1}
                                        max={5}
                                        marks={true}
                                        onChange={(event, newValue) => handleChangeLevel(index, newValue)}
                                    />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={6} sx={{ display: 'flex', justifyContent:'flex-start', marginLeft: '16px' }}>
                    <LinkTypography onClick={handleAddLanguage}>+ Add an Language</LinkTypography>
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default LanguageSection