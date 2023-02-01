import React, {FC, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select'
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'

const Translator = () => {

    const [loading, setLoading] = useState(true);
    const [supportedLanguages, setSupportedLanguages] = useState(null);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState(null);
    const [inputLanguage, setInputLanguage] = useState(null);
    const [outputLanguage, setoutputLanguage] = useState(null);
    
    
    useEffect(() =>{
        getSupportedLanguages()
    }, [])

    useEffect(()=>{
        if (!supportedLanguages){
            return;
        }
        getCurrentLanguage();
    },[supportedLanguages])
    
    const getSupportedLanguages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/Translator/languages');
            const dataFromResponse = await response.json();
            setSupportedLanguages(dataFromResponse);
        } catch (error) {
            console.error(error);
        }
    };
    
    const getCurrentLanguage = async () => {
        const result =  supportedLanguages.filter(obj => ['en', 'fr'].includes(obj.languageCode));
        setCurrentLanguage(result);
        setLoading(false);
    }
    const handleChangeFrom = (event) => {
        setInputLanguage(event.target.value);
    }
    const handleChangeTo = (event) => {
        setoutputLanguage(event.target.value);
    }
    const handleInputTextChange = (event) => {
        setInputText(event.target.value);
    }
    
    const handleSubmit = async () => {
        if (!inputText){
            return
        }
        try {
            const response = await fetch('api/Translator/translate',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputText, inputLanguage, outputLanguage })
            });
            const result = await response.json();
            const translation = convertToString(result.Translations[0].TranslatedText);
            setOutputText(translation);
        } catch (error) {
            console.error(error);
        }
    }
    
    const convertToString = (htmlString) => {
        const convertedString = htmlString.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
        return convertedString;
    }

    return (
        <div>
            <Grid container
                  display="flex"
                  pt={15}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={20}
            >
                <Grid item>
                    <InputLabel >Translate From:</InputLabel>
                    <div style={{ paddingTop: "5px", paddingBottom: "15px"}}>
                        <Select
                        value={inputLanguage}
                        onChange={handleChangeFrom}
                        >
                            { loading ? (<CircularProgress />) :
                                ( currentLanguage.map((item) => (
                                    <MenuItem key={item.languageCode} value={item.languageCode}>
                                        {item.languageCode}
                                    </MenuItem>
                                    ))
                                )}
                        </Select>
                    </div>
                    <div>
                        <TextField multiline
                                   minRows={10}
                                   maxRows={15}
                                   placeholder="Input Text"
                                   variant="outlined"
                                   style={{width: "400px"}}
                                   value={inputText}
                                   onChange={handleInputTextChange}
                        />
                    </div>
                </Grid>

                <Grid item>
                    <InputLabel>Translate To:</InputLabel>
                    <div style={{ paddingTop: "5px", paddingBottom: "15px"}}>
                        <Select
                            value={outputLanguage}
                            onChange={handleChangeTo}
                        >
                            { loading ? (<CircularProgress />) :
                                ( currentLanguage.map((item) => (
                                        <MenuItem key={item.languageCode} value={item.languageCode}>
                                            {item.languageCode}
                                        </MenuItem>
                                    ))
                                )}
                        </Select>
                    </div>

                    <div>
                        <TextField multiline
                                   minRows={10} 
                                   maxRows={15}
                                   placeholder="Translated Text"
                                   variant="outlined"
                                   inputProps={{
                                       readOnly: true
                                   }}
                                   style={{width: "400px"}}
                                   value={outputText}
                        />
                    </div>
                </Grid>
            </Grid>
            
            <Grid container
                  display="flex"
                  pt={15}
                  pb={5}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
            >
                <Grid item>
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faLanguage} style={{marginRight: '0.5rem'}}/> Translate
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Translator;