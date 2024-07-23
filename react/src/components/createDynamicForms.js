import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, IconButton } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LabelComponent from "../shared/components/label";
import { SaveForm, formItems, title } from "../shared/constants/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InputComponent from "../shared/components/forminput";
import ButtonComponent from "../shared/components/button";
import AutoCompleteComponent from "../shared/components/autoComplete";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './createAddEdit.css';
import DropdownComponent from "../shared/components/dropdown";
import CheckBoxComponent from "../shared/components/checkbox";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState();
    const [selectedId, setSelectedId] = useState();
    const [labelValue, setLabelValue] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [variantValue, setVariantValue] = useState("");
    const [colorValue, setColorValue] = useState("");
    const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
    const [formContent, setFormContent] = useState(null);

    const onDraghandle = (result) => {
        const resultValue = JSON.parse(JSON.stringify(formItems));
        if (result?.source?.droppableId == "formList" && result?.destination?.droppableId == "forms") {
            var value = resultValue?.find(x => x?.id === result?.draggableId);
            value.id = uuidv4();
            value.labelName = "";
            value.inputValue = (value?.key === "autocomplete" || value?.key === "select" || value?.key === "checkbox") ? [] : "";
            value.selectedValue = (value?.key === "autocomplete" || value?.key === "select" || value?.key === "checkbox") ? [] : "";
            value.selectedOptions = (value?.key === "autocomplete" || value?.key === "select") ? [] : value?.key === "checkbox" ? [
                {
                    key: "Option 1",
                    value: uuidv4()
                }
            ] : "";
            let valueData = formData?.splice(result?.source?.index, 0, value);
        }
        if (result.source.droppableId == "forms" && result.destination.droppableId == "forms") {
            const newItems = JSON.parse(JSON.stringify(formData));
            const removed = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, removed[0]);
            setFormData(newItems);
        }
    };

    const handleOpenDiv = (id) => {
        setId(id);
        setIsShown(true);
    }

    const handleDeleteElement = (index) => {
        let data = (formData?.filter((value, i) => i !== index));
        setFormData(data)
    }

    const handleCopyElement = (index) => {
        var data = JSON.parse(JSON.stringify(formData));
        let value = (data?.find((value, i) => i === index));
        value.id = uuidv4();
        var valueData = JSON.parse(JSON.stringify(formData));
        valueData?.splice(index + 1, 0, value);
        setFormData(valueData)
    }

    const handleEditElement = (index, data) => {
        console.log(data)
        if (data?.labelName !== "") {
            setLabelValue(data?.labelName)
        }
        else {
            setLabelValue("");
        }
        if (data?.inputValue !== "") {
            setInputValue(data?.inputValue)
        }
        else {
            if (data?.key !== "autocomplete") {
                setInputValue("");
            }
            else {
                setInputValue([]);
            }
        }
        setSelectedId(data?.id);
        setAutoCompleteOptions(data?.selectedOptions)
        setIsEdit(true);
    }

    const onChangeLabel = (event) => {
        setLabelValue(event?.target?.value)
    }

    const onChangeInput = (event) => {
        setInputValue(event?.target?.value)
    }

    const handleSave = (id, index) => {
        var value = (formData?.find((value) => value.id === id));
        value.labelName = labelValue;
        value.inputValue = value.key === "autocomplete" ? [] : inputValue;
        setIsEdit(false);
    }

    const handleCancel = (event) => {
        setIsEdit(false);
    }

    const handleAddOptions = (data, inputValue, index) => {
        let value = (formData?.find((value) => value?.id === data?.id));
        let valueData = (value?.selectedOptions?.splice(0, 0, {
            key: inputValue,
            value: uuidv4()
        }));
    }

    const handleRemoveOptions = (data, inputValue, index) => {
        var dataValue = JSON.parse(JSON.stringify(formData));
        console.log(data, inputValue, index, dataValue)
        let value = (dataValue?.find((value) => value?.id === data?.id));
        console.log(value)
        let valueData = (value?.selectedOptions?.splice(index, 1));
        console.log(valueData)
        let selectedValue = (dataValue?.find((value) => value?.id === data?.id));
        let valueData12 = (selectedValue?.selectedOptions?.splice(index, 1));

        setFormData(valueData12)
    }

    const handleChangeAutoComplete = (data, event, selectedValue) => {
        var value = (formData?.find((value) => value?.id === data?.id));
        value.selectedValue = selectedValue;
    }

    const handleChangeDropdown = (data, event, index) => {
        console.log(data, event, index)
        var dataValue = JSON.parse(JSON.stringify(formData));
        var value = (dataValue?.find((value, index) => value?.id === data?.id));
        value.selectedValue = event?.target?.value;
        dataValue.splice(index + 1, 1);
        dataValue.splice(index + 1, 0, value);
        setFormData(dataValue)
    }

    const handleChangeCheckbox = (event, index, value, data) => {
        console.log(value, data, index)
        var dataValue = JSON.parse(JSON.stringify(formData));
        var valueData = (dataValue?.find((value, index) => value?.id === data?.id));
        valueData.selectedValue = value;
        dataValue.splice(index + 1, 1);
        dataValue.splice(index + 1, 0, valueData);
        setFormData(dataValue)
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
                                            <Droppable droppableId="forms" type="FORMITEMS">
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}
                                                    >
                                                        {!formData?.length && !snapshot.isDraggingOver ?
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
                                                                    >{title}</Typography>
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
                                                                                        <Grid container xl={12}>
                                                                                            <Grid container xl={12}>
                                                                                                <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                    <LabelComponent value={data?.labelName} />
                                                                                                </Grid>
                                                                                                <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                    <InputComponent disabled={true} handleChange={null} value={data?.inputValue} />
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid> :
                                                                                        data?.key === "select" ?
                                                                                            <Grid container xl={12}>
                                                                                                <Grid container xl={12}>
                                                                                                    <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                        <LabelComponent value={data?.labelName} />
                                                                                                    </Grid>
                                                                                                    <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                        <DropdownComponent handleChange={(event, index) => handleChangeDropdown(data, event, index)}
                                                                                                            value={data?.selectedValue} options={data?.selectedOptions} />
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid> :
                                                                                            data?.key === "autocomplete" ?
                                                                                                <Grid container xl={12}>
                                                                                                    <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                        <LabelComponent value={data?.labelName} />
                                                                                                    </Grid>
                                                                                                    <Grid item xl={4} className="addElement">
                                                                                                        <AutoCompleteComponent handleClick={null} options={data?.selectedOptions} placeholder={"Select"}
                                                                                                            handleChange={(event, value) => handleChangeAutoComplete(data, event, value)} />
                                                                                                    </Grid>
                                                                                                </Grid> :
                                                                                                data?.key === "checkbox" ?
                                                                                                    <Grid container xl={12}>
                                                                                                        <Grid container xl={12}>
                                                                                                            <Grid item xl={4} sx={{ textAlign: "left" }}>
                                                                                                                <LabelComponent value={"addElement"} />
                                                                                                            </Grid>
                                                                                                            <Grid item xl={4} className="addElement">
                                                                                                                {
                                                                                                                    data?.selectedOptions?.map((data, index) => (
                                                                                                                        <CheckBoxComponent handleChange={(event, value, index) => handleChangeCheckbox(event, index, value, data)}
                                                                                                                            value={data?.value} label={data?.key} index={index} />
                                                                                                                    ))
                                                                                                                }
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                    </Grid> :
                                                                                                    data?.key === "button" ?
                                                                                                        <Grid item xl={12}>
                                                                                                            <Grid item xl={11} sx={{
                                                                                                                justifyContent: 'flex-end',
                                                                                                                display: 'flex'
                                                                                                            }}>
                                                                                                                <ButtonComponent disabled={false} handleClick={null} title={data?.inputValue === "" ? "Sample" : data?.inputValue}
                                                                                                                    variant={variantValue === "" ? "contained" : variantValue} color={colorValue === "" ? "primary" : colorValue} />
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                        : null
                                                                                }
                                                                                {id === data?.id && isShown &&
                                                                                    <Grid className="addElement">
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <EditIcon sx={{ width: "15px" }} onClick={() => handleEditElement(index, data)} />
                                                                                        </IconButton>
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <ContentCopyIcon sx={{ width: "15px" }} onClick={() => handleCopyElement(index)} />
                                                                                        </IconButton>
                                                                                        <IconButton aria-label="settings" className="addIcon">
                                                                                            <DeleteIcon sx={{ width: "15px" }} onClick={() => handleDeleteElement(index)} />
                                                                                        </IconButton>
                                                                                    </Grid>
                                                                                }
                                                                            </Box>
                                                                            {selectedId === data?.id && isEdit &&
                                                                                <>
                                                                                    <Grid container xl={12}>
                                                                                        {data?.value === "Input Text" ?
                                                                                            <>
                                                                                                <Grid item xl={4} sx={{ margin: "0 10px 0 0" }}>
                                                                                                    <InputComponent disabled={false} handleChange={onChangeLabel} value={labelValue} />
                                                                                                </Grid>
                                                                                                <Grid item xl={4}>
                                                                                                    <InputComponent disabled={false} handleChange={onChangeInput} value={inputValue} />
                                                                                                </Grid>
                                                                                            </> :
                                                                                            data?.value === "Button" ?
                                                                                                <>
                                                                                                    <Grid item xl={4} sx={{ margin: "0 10px 0 0" }}>
                                                                                                        <InputComponent disabled={false} handleChange={onChangeInput} value={inputValue} />
                                                                                                    </Grid>
                                                                                                    <Grid container xl={12} sx={{ margin: "0 10px 0 0" }}>
                                                                                                        <Button disabled={false} variant={"contained"} onClick={() => {
                                                                                                            setVariantValue("contained"); setColorValue("primary")
                                                                                                        }} className="buttons">{"Contained"}</Button>
                                                                                                        <Button disabled={false} variant={"outlined"} onClick={() => {
                                                                                                            setVariantValue("outlined"); setColorValue("primary")
                                                                                                        }} className="buttons">{"Outlined"}</Button>
                                                                                                        <Button disabled={false} variant={"contained"} color={"success"} onClick={() => {
                                                                                                            setVariantValue("contained"); setColorValue("success")
                                                                                                        }} className="buttons">{"Success"}</Button>
                                                                                                        <Button disabled={false} variant={"contained"} color={"warning"} onClick={() => {
                                                                                                            setVariantValue("contained"); setColorValue("warning")
                                                                                                        }} className="buttons">{"Warning"}</Button>
                                                                                                        <Button disabled={false} variant={"contained"} color={"error"} onClick={() => {
                                                                                                            setVariantValue("contained"); setColorValue("error")
                                                                                                        }} className="buttons">{"contained"}</Button>
                                                                                                    </Grid>
                                                                                                </> :
                                                                                                data?.value === "Auto Complete" ?
                                                                                                    <>
                                                                                                        <Grid container xl={12} sx={{ margin: "0 10px 0 0" }}>
                                                                                                            <Grid container xl={12} sx={{
                                                                                                                justifyContent: 'center',
                                                                                                                margin: "10px 10px 0 0"
                                                                                                            }}>
                                                                                                                <Grid item xl={4} sx={{ margin: "0px 10px 0 0" }}>
                                                                                                                    <InputComponent disabled={false} handleChange={onChangeLabel} value={labelValue} />
                                                                                                                </Grid>
                                                                                                                <Grid container xl={4} sx={{ margin: "0px 10px 0 0" }}>
                                                                                                                    <InputComponent disabled={false} handleChange={onChangeInput} value={inputValue} />
                                                                                                                    <IconButton aria-label="Example" onClick={() => handleAddOptions(data, inputValue, index)}>
                                                                                                                        <AddCircleIcon />
                                                                                                                    </IconButton>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={4} sx={{ margin: "0 10px 0 0" }}>
                                                                                                                <Typography>Selected Options</Typography>
                                                                                                                {
                                                                                                                    autoCompleteOptions?.map((val) => (
                                                                                                                        <Grid container sx={{
                                                                                                                            justifyContent: 'center',
                                                                                                                            alignItems: 'center',
                                                                                                                            margin: "10px 10px 0 0"
                                                                                                                        }}>
                                                                                                                            <Typography>{val?.key}</Typography>
                                                                                                                            <IconButton aria-label="Example" onClick={() => handleRemoveOptions(data, val, index)}>
                                                                                                                                <RemoveCircleOutlineIcon />
                                                                                                                            </IconButton>
                                                                                                                        </Grid>
                                                                                                                    ))
                                                                                                                }
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                    </> :
                                                                                                    data?.value === "Checkbox Group" ?
                                                                                                        <>
                                                                                                            <Grid item xl={4} sx={{ margin: "0 10px 0 0" }}>
                                                                                                                <InputComponent disabled={false} handleChange={onChangeLabel} value={labelValue} />
                                                                                                            </Grid>
                                                                                                            <Grid container xl={4}>
                                                                                                                <InputComponent disabled={false} handleChange={onChangeInput} value={inputValue} />
                                                                                                                <IconButton aria-label="Example" onClick={() => handleAddOptions(data, inputValue, index)}>
                                                                                                                    <AddCircleIcon />
                                                                                                                </IconButton>
                                                                                                            </Grid>
                                                                                                        </> :
                                                                                                        data?.value === "Select" ?
                                                                                                            <>
                                                                                                                <Grid item xl={4} sx={{ margin: "0 10px 0 0" }}>
                                                                                                                    <InputComponent disabled={false} handleChange={onChangeLabel} value={labelValue} />
                                                                                                                </Grid>
                                                                                                                <Grid container xl={4}>
                                                                                                                    <InputComponent disabled={false} handleChange={onChangeInput} value={inputValue} />
                                                                                                                    <IconButton aria-label="Example" onClick={() => handleAddOptions(data, inputValue, index)}>
                                                                                                                        <AddCircleIcon />
                                                                                                                    </IconButton>
                                                                                                                </Grid>
                                                                                                            </>
                                                                                                            : null
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid container xl={12} sx={{ margin: "10px 0 10px 0", justifyContent: "flex-end" }}>
                                                                                        <ButtonComponent disabled={false} handleClick={() => handleSave(data?.id, index)} title={"Save"} variant={"contained"} />
                                                                                        <ButtonComponent disabled={false} handleClick={() => handleCancel()} title={"Cancel"} variant={"contained"} />
                                                                                    </Grid>
                                                                                </>
                                                                            }
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
                                            <Button size="small" variant="contained">{SaveForm}</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card sx={{ minWidth: 285, textAlign: 'left' }}>
                                        <CardContent sx={{ padding: 0 }}>
                                            <Droppable droppableId='formList' type="FORMITEMS" isDropDisabled>
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
                </Grid >
            </Box >
        </>
    )
}
export default CreateDynamicForms;