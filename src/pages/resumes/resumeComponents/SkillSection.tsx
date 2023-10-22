import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton, Slider, Typography, Box  } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography, CustomSlider } from './styles';
import { useSkill } from '../../../components/hooks/UseSkill';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';

interface SkillSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	skills: [
        {
            _id: string;
			skill_name: string;
			level: number;
		}
    ];
}

interface SkillSectionProps {
    skill_section: SkillSectionForm; 
}

const SkillSection: React.FC<SkillSectionProps> = ({ skill_section }) => {
    const [skillData, setSkillData] = useState<SkillSectionForm>({
        _id: skill_section._id,
        resumeId: skill_section.resumeId || '',
        field_name: skill_section.field_name || 'Skills',
        skills: skill_section.skills || [],
    });

    const { addSkill, updateSkill, deleteSkill, deleteSkillSection } = useSkill();
	const [editSkillField, setEditSkillField] = useState(false);
	const [skillFieldLoading, setSkillFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(skillData.skills.map(() => false));
    const [secondsArray, setSecondsArray] = useState(skillData.skills.map(() => 2));
    const [showDialogSkillSection, setShowDialogSkillSection] = useState(false);
    const [showDialogSkill, setShowDialogSkill] = useState(false);
    const [showDetails, setShowDetails] = useState(
        skillData.skills.map(() => false)
    );

    const toggleDetails = (index: number) => {
        setShowDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index] = !newDetails[index];
            return newDetails;
        });
    };
    
    const levelMarks = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

    const handleChangeLevel = (index: number, newValue: number) => {
        setSkillData(prevData => {
            const updatedSkills = [...prevData.skills];
            updatedSkills[index].level = newValue;
    
            return {
                ...prevData,
                skills: updatedSkills,
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
            setSkillData({
                ...skillData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setSkillData(prevData => {
                const updatedSkills = [...prevData.skills];
                updatedSkills[index] = {
                    ...updatedSkills[index],
                    [fieldName]: value,
                };
    
                return {
                    ...prevData,
                    skills: updatedSkills,
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
	
	const skillUpdate = async (index: number) => {
		await updateSkill(skillData.resumeId, skillData.skills[index]._id, skillData.skills[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setSkillFieldLoading(true);
		await updateSkill(skillData.resumeId, skillData._id, skillData);
		setEditSkillField(false);
		setSkillFieldLoading(false);
	};

    const handleAddSkill = async () =>{
        const skill_section = await addSkill(skillData.resumeId);
        setSkillData(skill_section);
    };

	const handleDeleteSkillSection = async () =>{
		await deleteSkillSection(skillData.resumeId);
        setShowDialogSkillSection(false);
	};

	const handleDeleteSkill = async (index: number) =>{
		const skill_section = await deleteSkill(skillData.resumeId, skillData.skills[index]._id);
        setSkillData(skill_section);
        setShowDialogSkill(false);
	};

    const handleShowDialogSkillSection = () =>{
        setShowDialogSkillSection(prev => !prev);
    }
    const handleShowDialogSkill = () =>{
        setShowDialogSkill(prev => !prev);
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
                skillUpdate(index);
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
				{editSkillField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
						<CustomTextField
							fullWidth
							label="Skills Field Name"
							variant="filled"
							name="field_name"
							value={skillData.field_name}
							onChange={handleChange}
						/>
						{skillFieldLoading?
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
                                <IconButton onClick={handleShowDialogSkillSection} sx={{ '&:focus': { outline: 'none' }}} >
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
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{skillData.field_name}</CustomTypography>
                        <IconButton onClick={() => setEditSkillField(true)} sx={{ '&:focus': { outline: 'none' }}} >
                            <Edit
                                sx={{
                                    color: '#6499E9',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleShowDialogSkillSection} sx={{ '&:focus': { outline: 'none' }}} >
                            <Delete
                                sx={{
                                    color: '#D71313',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <AlertDialog open={showDialogSkillSection} handleCloseDialog={handleShowDialogSkillSection} handleAgreement={handleDeleteSkillSection}/>
					</Grid>
				)}
                {skillData.skills.map((skill, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #272829', padding: '16px', margin: '0 0 16px 16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomTypography variant="body1" onClick={() => toggleDetails(index)} sx={{ 
                                    marginLeft: 0, 
                                    cursor: 'pointer' ,
                                    '&:hover': { color: '#687EFF' }
                                    }}>
                                    {skill.skill_name}
                                    <IconButton sx={{ '&:focus': { outline: 'none' }}} >
                                        {showDetails[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </CustomTypography>
                                <IconButton onClick={handleShowDialogSkill} sx={{ '&:focus': { outline: 'none' }}} >
                                    <DeleteOutline
                                        sx={{
                                            color: '#FF6969',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <AlertDialog open={showDialogSkill} handleCloseDialog={handleShowDialogSkill} handleAgreement={() => handleDeleteSkill(index)}/>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Skill Name"
                                            variant="filled"
                                            name={`skill_name;-;${index}`}
                                            value={skill.skill_name}
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
                                            color:  skill.level === 1 ? '#FF6464' :
                                                    skill.level === 2 ? '#E25E3E' :
                                                    skill.level === 3 ? '#FFBD67' :
                                                    skill.level === 4 ? '#5BE7A9' :
                                                                        '#8E8FFA',
                                        }}>
                                            {levelMarks[skill.level - 1]}
                                        </Typography>
                                    </Box>
                                    <CustomSlider
                                        value={skill.level}
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
                    <LinkTypography onClick={handleAddSkill}>+ Add an Skill</LinkTypography>
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default SkillSection