import React,{useState, useEffect} from 'react'
import './AskPage.css'
import ProfileSuggest from '../Profile/ProfileSuggest'
import AddIcon from '@material-ui/icons/Add';
import HomePost from '../Home/HomePost';
import { Button, TextField, Select, MenuItem, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import bg1 from '../../images/bg1.png';
import axios from "axios";
import {useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";

function AskPage() {
  const history= useHistory();
  const theme = useTheme();
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  const [loading,setLoading]=useState(false);
  const [profiles,setProfiles] = useState([]);
  const [tags,setTags] = useState([]);
  const [inputTags,setInputTags]=useState([]);
  const [selectedTags,setSelectedTags]=useState([]);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [images,setImages]=useState([]);
  const [form,setForm]=useState("");

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(tag, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


  const fetchTags = async() => {
    let resp = await axios.get('/tag/all');
    if(resp.data.message){
      setInputTags(resp.data.tags);
      setTags(resp.data.tags);
    }
  }

  const fetchProfiles = async() => {
    if(token){
      let resp = await axios.get('/profile/custom',{ headers: { "Authorization" : `Bearer ${token}`} });
      if(resp.data.message){
        setProfiles(resp.data.users)
      }
    }else{
      let resp = await axios.get('/profile/all');
      if(resp.data.message){
        setProfiles(resp.data.users.filter((u)=>u._id!=userID))
      }
    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  useEffect(()=>{
    fetchTags();
    fetchProfiles();
    setForm(new FormData())
  },[])
    return (
        <div className="AskPageContainer">
            <div className="ProfileLeft">
                <div className="AskBox" >
                    <TextField className="AskHeaders" variant="outlined" label="Title" onChange={(e)=>{
                      setTitle(e.target.value);
                      form.set('title',e.target.value)
                    }}/>
                    <TextField className="AskHeaders" variant="outlined" label="Description" multiline rows={15}
                    onChange={(e)=>{
                      setDescription(e.target.value);
                      form.set('description',e.target.value)
                    }}
                    />
                   <FormControl>
                   <InputLabel id="demo-multiple-name-label" style={{marginLeft:20}}>Tags</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                     multiple
                     value={selectedTags}
                     onChange={handleChange}
                     input={<OutlinedInput label="Tags" />}
                    MenuProps={MenuProps}
                    >{inputTags.map((t) => (
                      <MenuItem
                      key={t._id}
                      value={t._id}
                      style={getStyles(t._id, selectedTags, theme)}
                      >{t.name}</MenuItem>
                    ))}</Select></FormControl>
                    <TextField className="AskHeaders" variant="outlined" type="file" onChange={(e)=>setImages(e.target.files)}/>
                    <Button className="PostQButton" variant="contained"
                    onClick={async(e)=>{
                      setLoading(true);
                      e.preventDefault();
                      if (selectedTags) {
                        selectedTags.map((p, index) => form.set(`tags[${index}]`, p));
                       }
                       if (images) {
                         for (const key of Object.keys(images)) {
                           form.set("images", images[key]);
                         }
                       }
                      try{
                        let resp = await axios.post(`/question`,form,{ headers: { "Authorization" : `Bearer ${token}`} });
                        if(resp.data.message){
                          setLoading(false);
                          history.push("/home");
                        }
                      }catch(err){
                        setLoading(false);
                        Swal.fire({
                          icon: 'error',
                          text: err.response.data.error
                        })
                      }

                    }}
                    >{loading?"Loading...":"POST"}</Button>
                  </div>
                </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                {profiles?profiles.length==0?<h3>No suggested profile found</h3>:profiles.slice(0, 5).map((p)=>
                  <ProfileSuggest profile={p}/>
                ):<h3>Loading...</h3>
              }
                <div className="ProfileRightHead" >Suggested Tags</div>
                <div>
                    {tags&&tags.slice(0, 5).map((t)=>
                      <div className="SuggestdTagsBox">
                          <span className="TagSuggest">{t.name} <AddIcon /></span>
                      </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AskPage
