import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, IconButton } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formItems } from "../shared/constants/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputComponent from "../shared/components/forminput";
import ButtonComponent from "../shared/components/button";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import './createAddEdit.css';

const getListStyle = isDraggingOver => ({
    backgroundColor: isDraggingOver ? '#8597fb' : '#fff',
    opacity: isDraggingOver ? 5 : null,
    height: '55%',
    overflow: 'auto',
    margin: '0px 0px 15px 0'
});

const CreateDynamicForms = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [id, setId] = useState();

    const onDraghandle = (result) => {
        if (result.source.droppableId == "formList" && result.destination.droppableId == "forms") {
            const formlist = formItems?.find(x => x.id === result.draggableId);
            formlist.id = uuidv4();
            setFormData([...formData, formlist]);
        }
        if (result.source.droppableId == "formlist" && result.destination.droppableId == "forms") {
            const newItems = Array.from(formData);
            const [removed] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, removed);
            setFormData(newItems);
        }
    };

    const handleOpenDiv = (id) => {
        setId(id);
        setIsShown(true);
    }

    const handleDeleteElement = (id) => {
        let data = formData?.filter(x => x.id !== id);
        setFormData(data)
    }

    const handleCopyElement = (id, index) => {
        let data = (formData?.filter(x => x.id === id));
        let value = data?.map((val) => val)
        let indexData = data.splice(index + 1, 0, {
            id: "fd510364-e6c8-4bbb-87cb-b1537e190f40",
            key: "text",
            value: "Input Text"
        });
        setFormData(indexData)
    }

    console.log(formData)
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderComponent showAdd={false} />
                        <DragDropContext onDragEnd={onDraghandle}>
                            <Grid container xs={12}>
                                <Grid item xs={9} sx={{ margin: "0 20px 0 0" }}>
                                    <Card>
                                        <CardContent>
                                            <Droppable droppableId="forms" type="formItems">
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}
                                                    >
                                                        {formData?.length === 0 && !snapshot.isDraggingOver ?
                                                            (
                                                                <div style={{
                                                                    textAlign: 'center',
                                                                    display: 'flex',
                                                                    alignContent: 'center',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    height: '100%',
                                                                    border: '1px dashed lightgray'
                                                                }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: ".9375rem", margin: "0",
                                                                            fontWeight: 600
                                                                        }}
                                                                        gutterBottom
                                                                    >Please Drag and Drop formlist Fles here</Typography>
                                                                </div>
                                                            ) : null
                                                        }
                                                        {formData ?
                                                            formData?.map((data, index) => (
                                                                <Draggable draggableId={`formlist_${index}`} index={index} key={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                        >
                                                                            <Box
                                                                                component="div"
                                                                                noValidate
                                                                                autoComplete="off"
                                                                                sx={{
                                                                                    margin: '10px 0',
                                                                                    display: 'flex',
                                                                                    justifyContent: 'flex-start'
                                                                                }}
                                                                                onMouseEnter={() => handleOpenDiv(data?.id)}
                                                                                onMouseLeave={() => setIsShown(false)}>
                                                                                {
                                                                                    data?.key === "text" ?
                                                                                        <Grid item xl={12}>
                                                                                            <Grid item xl={4}>
                                                                                                <InputComponent disabled={false} handleChange={null} value={null} />
                                                                                            </Grid>
                                                                                        </Grid> :
                                                                                        data?.key === "button" ?
                                                                                            <Grid item xl={12}>
                                                                                                <Grid item xl={4} className="addElement">
                                                                                                    <ButtonComponent disabled={false} handleClick={null} title={"Submit"} variant={null} color={null} />
                                                                                                </Grid>
                                                                                            </Grid> : null
                                                                                }
                                                                                {id === data?.id && isShown &&
                                                                                    <Grid className="addElement">
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <EditIcon sx={{ width: "15px" }} />
                                                                                        </IconButton>
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <ContentCopyIcon sx={{ width: "15px" }} onClick={() => handleCopyElement(data?.id, index)} />
                                                                                        </IconButton>
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <DeleteIcon sx={{ width: "15px" }} onClick={() => handleDeleteElement(data?.id)} />
                                                                                        </IconButton>
                                                                                    </Grid>
                                                                                }
                                                                            </Box>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            )) : null
                                                        }
                                                    </div>
                                                )}
                                            </Droppable>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" variant="contained">Save Form</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card sx={{ minWidth: 285, textAlign: 'left' }}>
                                        <CardContent sx={{ padding: 0 }}>
                                            <Droppable droppableId='formList' type="formItems" isDropDisabled>
                                                {(provided, snapshot) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        {formItems ?
                                                            formItems.map((data, index) => (
                                                                <Draggable draggableId={data.id} index={index} key={index}>
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <>
                                                                                    <Typography variant="subtitle1" sx={{ borderBottom: "1px solid #c5c5c5", padding: '5px 20px' }}>{data.value}</Typography>
                                                                                </>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            )) : null
                                                        }
                                                    </div>
                                                )}
                                            </Droppable>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </DragDropContext>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default CreateDynamicForms;