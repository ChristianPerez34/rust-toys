import {Box, Button, Group, NativeSelect, Stack,} from "@mantine/core";
import {IconCheck, IconChevronDown, IconChevronLeft, IconX} from "@tabler/icons";
import {open} from "@tauri-apps/api/dialog";
import {invoke} from "@tauri-apps/api/tauri";
import {useState} from "react";

import {useRouter} from "next/router";
import {ToolBox} from "../DevTools/ToolBox";
import {showNotification, updateNotification} from "@mantine/notifications";

const selectData = ["BMP", "JPG", "PNG", "PDF"];

export function ImageConverter() {
    const router = useRouter();
    const [selectValue, setSelectValue] = useState("bmp");
    const [files, setFiles] = useState<string[]>([]);

    const handleImageConvertButtonClick = () => {
        const notificationId = "convert-image"
        showNotification({
            id: notificationId,
            title: "Converting Images",
            message:
                "Hey there, please wait a moment until conversion is finished.",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });
        invoke<string>("convert_image", {files: files, convertTo: selectValue}).then(
            (response) => {
                updateNotification({
                    id: notificationId,
                    title: "Conversion success",
                    message: response,
                    autoClose: 3000,
                    icon: <IconCheck size={16}/>,
                    color: "green",
                });
            }
        ).catch(error => {
            updateNotification({
                id: notificationId,
                title: "Conversion failed",
                message: error,
                autoClose: 3000,
                icon: <IconX size={16}/>,
                color: "red",
            });
        });
    };

    const handleDropzoneClick = () => {
        open({
            multiple: true,
            filters: [
                {
                    name: "Image",
                    extensions: ["png", "jpeg", "jpg", "bmp"].filter((extension) => {
                        let value = selectValue.toLocaleLowerCase();
                        if (value === "jpg") {
                            return extension !== value && extension !== "jpeg";
                        }
                        return extension !== value;
                    }),
                },
            ],
        }).then((files) => {
            if (Array.isArray(files) || files !== null) {
                setFiles(files as string[]);
            }
        });
    };

    const disableButton = files.length <= 0;

    return (
        <>
            <ToolBox>
                <Stack justify="center" spacing={"sm"}>
                    <Button
                        variant="subtle"
                        compact
                        style={{width: "min-content"}}
                        onClick={() => router.back()}
                    >
                        <IconChevronLeft/>{" "}
                    </Button>
                    <NativeSelect
                        label="Convert image to..."
                        placeholder="Your desired output"
                        data={selectData}
                        rightSection={<IconChevronDown size={14}/>}
                        rightSectionWidth={40}
                        onChange={(event) => setSelectValue(event.currentTarget.value)}
                        defaultValue={selectData[0]}
                    />
                    <Box
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[6]
                                    : theme.colors.gray[0],
                            textAlign: "center",
                            padding: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                            cursor: "pointer",
                            border: "2px dashed #373A40",

                            "&:hover": {
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[5]
                                        : theme.colors.gray[1],
                            },
                        })}
                        onClick={handleDropzoneClick}
                    >
                        Click to select files
                    </Box>
                    <Group spacing={"xs"} grow>
                        <Button
                            variant="outline"
                            onClick={handleImageConvertButtonClick}
                            disabled={disableButton}
                        >
                            convert
                        </Button>
                        <Button variant="outline" onClick={() => setFiles([])}>
                            clear
                        </Button>
                    </Group>
                </Stack>
            </ToolBox>
        </>
    );
}
