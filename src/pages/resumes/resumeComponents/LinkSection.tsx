import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography } from './styles';
import { useLink } from '../../../components/hooks/UseLink';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';

interface LinkSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	links: [
        {
            _id: string;
			webite_name: string;
			url: string;
		}
    ];
}

interface LinkSectionProps {
    link_section: LinkSectionForm; 
}

const LinkSection: React.FC<LinkSectionProps> = ({ link_section }) => {
    const [linkData, setLinkData] = useState<LinkSectionForm>({
        _id: link_section._id,
        resumeId: link_section.resumeId || '',
        field_name: link_section.field_name || 'Websites & Links',
        links: link_section.links || [],
    });

    const { addLink, updateLink, deleteLink, deleteLinkSection } = useLink();
	const [editLinkField, setEditLinkField] = useState(false);
	const [linkFieldLoading, setLinkFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(linkData.links.map(() => false));
    const [secondsArray, setSecondsArray] = useState(linkData.links.map(() => 2));
    const [showDialogLinkSection, setShowDialogLinkSection] = useState(false);
    const [showDialogLink, setShowDialogLink] = useState(false);
    const [showDetails, setShowDetails] = useState(
        linkData.links.map(() => false)
      );

    const toggleDetails = (index: number) => {
        setShowDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index] = !newDetails[index];
            return newDetails;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "field_name") {
            setLinkData({
                ...linkData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setLinkData(prevData => {
                const updatedLinks = [...prevData.links];
                updatedLinks[index] = {
                    ...updatedLinks[index],
                    [fieldName]: value,
                };
    
                return {
                    ...prevData,
                    links: updatedLinks,
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
	
	const linkUpdate = async (index: number) => {
		await updateLink(linkData.resumeId, linkData.links[index]._id, linkData.links[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setLinkFieldLoading(true);
		await updateLink(linkData.resumeId, linkData._id, linkData);
		setEditLinkField(false);
		setLinkFieldLoading(false);
	};

    const handleAddLink = async () =>{
        const link_section = await addLink(linkData.resumeId);
        setLinkData(link_section!);
    };

	const handleDeleteLinkSection = async () =>{
		await deleteLinkSection(linkData.resumeId);
        setShowDialogLinkSection(false);
	};

	const handleDeleteLink = async (index: number) =>{
		const link_section = await deleteLink(linkData.resumeId, linkData.links[index]._id);
        setLinkData(link_section!);
        setShowDialogLink(false);
	};

    const handleShowDialogLinkSection = () =>{
        setShowDialogLinkSection(prev => !prev);
    }
    const handleShowDialogLink = () =>{
        setShowDialogLink(prev => !prev);
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
                linkUpdate(index);
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
				{editLinkField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
						<CustomTextField
							fullWidth
							label="Links Field Name"
							variant="filled"
							name="field_name"
							value={linkData.field_name}
							onChange={handleChange}
						/>
						{linkFieldLoading?
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
                                <IconButton onClick={handleShowDialogLinkSection} sx={{ '&:focus': { outline: 'none' }}} >
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
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{linkData.field_name}</CustomTypography>
                        <IconButton onClick={() => setEditLinkField(true)} sx={{ '&:focus': { outline: 'none' }}} >
                            <Edit
                                sx={{
                                    color: '#6499E9',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleShowDialogLinkSection} sx={{ '&:focus': { outline: 'none' }}} >
                            <Delete
                                sx={{
                                    color: '#D71313',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <AlertDialog open={showDialogLinkSection} handleCloseDialog={handleShowDialogLinkSection} handleAgreement={handleDeleteLinkSection}/>
					</Grid>
				)}
                {linkData.links.map((link, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #272829', padding: '16px', margin: '0 0 16px 16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomTypography variant="body1" onClick={() => toggleDetails(index)} sx={{ 
                                    marginLeft: 0, 
                                    cursor: 'pointer' ,
                                    '&:hover': { color: '#687EFF' }
                                    }}>
                                    {link.webite_name}
                                    <IconButton sx={{ '&:focus': { outline: 'none' }}} >
                                        {showDetails[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </CustomTypography>
                                <IconButton onClick={handleShowDialogLink} sx={{ '&:focus': { outline: 'none' }}} >
                                    <DeleteOutline
                                        sx={{
                                            color: '#FF6969',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <AlertDialog open={showDialogLink} handleCloseDialog={handleShowDialogLink} handleAgreement={() => handleDeleteLink(index)}/>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Website Name"
                                            variant="filled"
                                            name={`webite_name;-;${index}`}
                                            value={link.webite_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Link"
                                            variant="filled"
                                            name={`url;-;${index}`}
                                            value={link.url}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={6} sx={{ display: 'flex', justifyContent:'flex-start', marginLeft: '16px' }}>
                    <LinkTypography onClick={handleAddLink}>+ Add an Link</LinkTypography>
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default LinkSection