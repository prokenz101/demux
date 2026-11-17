import type { SidebarFormat } from "../media";
import { openAction } from "./sharedSidebar.svelte";


export const mediaFieldMap = new Map<string, SidebarFormat>([
    //TODO: Change all the documentations to be much more in depth, with more examples
    ["", {}], //* Initial value, will never be seen
    [
        "media", //* Branch field
        //TODO: Add clean summary for media, and every other branch
        {
            displayName: "Media display name",
            description: "Media description",
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Properties
    [
        "@ref",
        {
            displayName: "File Path",
            description: "Indicates the complete absolute path to the media file on the system, including the root directory, folder hierarchy, file name, and extension.",
            actions: [
                {
                    iconPath: "/assets/icons/open_file.svg",
                    altText: "Open file",
                    label: "Open file",
                    onClick: () => { openAction.openFile(); }
                },
                {
                    iconPath: "/assets/icons/open_folder.svg",
                    altText: "Open file location",
                    label: "Open file location",
                    onClick: () => { openAction.openFileLocation(); }
                }
            ]
        }
    ],
    [
        "@type",
        {
            displayName: "Stream Type",
            description: "Identifies the category of the media stream, such as General, Video, Audio, Text, Image, Menu, or Other."
        }
    ],
    [
        "@typeorder",
        {
            displayName: "Stream Type Order",
            description: "Indicates the sequential position of a stream when multiple streams of the same type exist (such as multiple audio tracks), ordered by how they are stored in the bitstream.\n\nIt is only present when more than one stream of the same type exists."
        }
    ],
    [
        "Album_ReplayGain_Gain",
        {
            displayName: "Album ReplayGain Gain",
            description: "Indicates the gain adjustment (in dB) needed to normalize the perceived loudness of the entire album to the ReplayGain reference level of 89 dB SPL (Sound Pressure Level), while preserving relative volume differences between its tracks.\n\n**ReplayGain** is an audio normalization standard that prevents having to manually adjust volume when playing tracks or albums mastered at different loudness levels."
        }
    ],
    [
        "Album_ReplayGain_Gain_String",
        {
            displayName: "Album ReplayGain Gain String",
            description: "Indicates the gain adjustment (in dB) needed to normalize the perceived loudness of the entire album to the ReplayGain reference level of 89 dB SPL (Sound Pressure Level), while preserving relative volume differences between its tracks.\n\n**ReplayGain** is an audio normalization standard that prevents having to manually adjust volume when playing tracks or albums mastered at different loudness levels.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "Album_ReplayGain_Peak",
        {
            displayName: "Album ReplayGain Peak",
            description: "Indicates the maximum sample amplitude across all tracks in the album, represented on a normalized scale where 1.0 corresponds to digital full scale (0 dBFS).\n\nMedia players use this peak value alongside [Album ReplayGain Gain](#field:Album_ReplayGain_Gain) to prevent audio clipping when applying positive gain adjustments during playback."
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
            description: "Indicates the total number of audio streams (or tracks) contained within the media file.\n\nThis is distinct from [Total Audio Channels](#field:Audio_Channels_Total), which counts individual audio channels (such as stereo or 5.1) rather than separate streams."
        }
    ],
    [
        "Audio_Channels_Total",
        {
            displayName: "Total Audio Channels",
            description: "Indicates the cumulative number of audio channels across all audio streams in the file.\n\nAn audio channel represents a single, independent pathway of sound going to or from one point, such as a single speaker or microphone. For instance, a mono stream uses 1 channel, whereas a stereo stream uses 2.",
        }
    ],
    [
        "Audio_Codec_List",
        {
            description: "A list of all audio codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Audio Format List](#field:Audio_Format_List) instead.",
        }
    ],
    [
        "Audio_Format_List",
        {
            description: "A list of all audio codecs found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Audio_Format_WithHint_List",
        {
            displayName: "Audio Format List (with hint)",
            description: "A list of all audio codecs found in the file, separated by forward slashes (/), including common alternative codec names."
        }
    ],
    [
        "Audio_Language_List",
        {
            description: "A list of all audio stream languages found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "CodecID",
        {
            description: "Indicates the raw, container-specific identifier used to specify the format or codec of the file or stream.\n\nUnlike [Format](#field:Format), which provides a standardized name, this value reflects the exact tag stored in the container header."
        }
    ],
    [
        "CodecID_Compatible",
        {
            description: "Lists the compatible container brands or specification standards declared in the file header."
        }
    ],
    [
        "CodecID_Description",
        {
            description: "Codec description, as defined by the container."
        }
    ],
    [
        "CodecID_Hint",
        {
            description: "Indicates common alternative names for a codec."
        }
    ],
    [
        "CodecID_Info",
        {
            displayName: "Codec ID Information",
            description: "Provides additional descriptive information or the full specification name associated with the [Codec ID](#field:CodecID)."
        }
    ],
    [
        "CodecID_String",
        {
            description: "Indicates the raw, container-specific identifier used to specify the format or codec of the file or stream.\n\nUnlike [Format](#field:Format), which provides a standardized name, this value reflects the exact tag stored in the container header.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "CodecID_Url",
        {
            displayName: "Codec ID URL",
            description: "Provides a reference URL with additional details or specifications associated with the [Codec ID](#field:CodecID)."
        }
    ],
    [
        "CodecID_Version",
        {
            description: "Specifies the version of the [Codec ID](#field:CodecID)."
        }
    ],
    [
        "CompleteName",
        {
            description: "Indicates the full path of the file, including the directory path, file name, and extension.\n\nUsually identical to [File Path](#field:@ref)."
        }
    ],
    [
        "CompleteName_Last",
        {
            description: "Indicates the full path of the last file in a sequence of files, including the directory path, file name, and extension."
        }
    ],
    [
        "Count",
        {
            description: "Indicates the total number of internal parameter slots allocated for this stream, including empty fields that are omitted from the tree."
        }
    ],
    [
        "DataSize",
        {
            description: "Indicates the size (in bytes) of the raw media data payload within the file, excluding container headers and footers.\n\nTypically, the total [File Size](#field:FileSize) equals the sum of [Header Size](#field:HeaderSize), Data Size, and [Footer Size](#field:FooterSize)."
        }
    ],
    [
        "Delay",
        {
            description: "Indicates the starting time offset (in milliseconds) applied to the stream to synchronize its playback with other tracks in the file.\n\nPositive values delay the start of the stream, while negative values shift it earlier relative to the beginning of the container."
        }
    ],
    [
        "Delay_DropFrame",
        {
            description: "Indicates whether the timecode used for [Delay](#field:Delay) uses drop-frame numbering to stay aligned with real-world clock time (common in 29.97 or 59.94 fps NTSC video)."
        }
    ],
    [
        "Delay_Settings",
        {
            description: "Specifies additional parameters that define how [Delay](#field:Delay) is interpreted, such as timecode frame rate or drop-frame settings."
        }
    ],
    [
        "Delay_Source",
        {
            description: "Indicates the source from which [Delay](#field:Delay) was extracted, such as the container metadata or a specific stream."
        }
    ],
    [
        "Delay_Source_String",
        {
            description: "Indicates the source from which [Delay](#field:Delay) was extracted, such as the container metadata or a specific stream.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "Delay_String",
        {
            description: "Displays [Delay](#field:Delay) as a human-readable string using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 213 ms)."
        }
    ],
    [
        "Delay_String1",
        {
            description: "Displays [Delay](#field:Delay) using hours, minutes, seconds, and milliseconds with any zero-value units omitted (for example, 1 s 250 ms)."
        }
    ],
    [
        "Delay_String2",
        {
            description: "Displays [Delay](#field:Delay) using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 213 ms)."
        }
    ],
    [
        "Delay_String3",
        {
            description: "Displays [Delay](#field:Delay) in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Delay_String4",
        {
            description: "Displays [Delay](#field:Delay) in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Delay_String5",
        {
            description: "Displays [Delay](#field:Delay) in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
        }
    ],
    [
        "Duration",
        {
            description: "Indicates the total running time of the file, determined by the container header or the longest individual stream."
        }
    ],
    [
        "Duration_End",
        {
            description: "Indicates the end time of the stream, reported either in Coordinated Universal Time (UTC) or as a relative timestamp offset."
        }
    ],
    [
        "Duration_End_String",
        {
            description: "Displays [Duration End](#field:Duration_End) as a human-readable string using up to the two largest non-zero time units (for example, 2 min 6 s), or as a formatted UTC timestamp."
        }
    ],
    [
        "Duration_End_String1",
        {
            description: "Displays [Duration End](#field:Duration_End) using hours, minutes, seconds, and milliseconds with zero-value units omitted (for example, 2 min 6 s 584 ms)."
        }
    ],
    [
        "Duration_End_String2",
        {
            description: "Displays [Duration End](#field:Duration_End) using up to the two largest non-zero time units (for example, 2 min 6 s)."
        }
    ],
    [
        "Duration_End_String3",
        {
            description: "Displays [Duration End](#field:Duration_End) in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Duration_End_String4",
        {
            description: "Displays [Duration End](#field:Duration_End) in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_End_String5",
        {
            description: "Displays [Duration End](#field:Duration_End) in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
        }
    ],
    [
        "Duration_Start",
        {
            description: "Indicates the start time of the stream, reported either in Coordinated Universal Time (UTC) or as a relative timestamp offset."
        }
    ],
    [
        "Duration_Start_String",
        {
            description: "Displays [Duration Start](#field:Duration_Start) as a human-readable string using up to the two largest non-zero time units (for example, 2 min 6 s), or as a formatted UTC timestamp."
        }
    ],
    [
        "Duration_Start_String1",
        {
            description: "Displays [Duration Start](#field:Duration_Start) using hours, minutes, seconds, and milliseconds with zero-value units omitted (for example, 2 min 6 s 584 ms)."
        }
    ],
    [
        "Duration_Start_String2",
        {
            description: "Displays [Duration Start](#field:Duration_Start) using up to the two largest non-zero time units (for example, 2 min 6 s)."
        }
    ],
    [
        "Duration_Start_String3",
        {
            description: "Displays [Duration Start](#field:Duration_Start) in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Duration_Start_String4",
        {
            description: "Displays [Duration Start](#field:Duration_Start) in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_Start_String5",
        {
            description: "Displays [Duration Start](#field:Duration_Start) in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
        }
    ],
    [
        "Duration_String",
        {
            description: "Displays [Duration](#field:Duration) as a human-readable string using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 1 h 40 min)."
        }
    ],
    [
        "Duration_String1",
        {
            description: "Displays [Duration](#field:Duration) using hours, minutes, seconds, and milliseconds with any zero-value units omitted (for example, 1 h 40 min 12 s 500 ms)."
        }
    ],
    [
        "Duration_String2",
        {
            description: "Displays [Duration](#field:Duration) using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 1 h 40 min)."
        }
    ],
    [
        "Duration_String3",
        {
            description: "Displays [Duration](#field:Duration) in hours, minutes, seconds, and milliseconds format (for example, 01:40:00.000)."
        }
    ],
    [
        "Duration_String4",
        {
            description: "Displays [Duration](#field:Duration) in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_String5",
        {
            description: "Displays [Duration](#field:Duration) in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
        }
    ],
    [
        "Encryption",
        {
            description: "Indicates whether the file or stream is encrypted, or specifies the encryption scheme or DRM system applied to the media data."
        }
    ],
    [
        "Encryption_Format",
        {
            description: "Specifies the encryption standard or cipher algorithm used to protect the stream."
        }
    ],
    [
        "Encryption_InitializationVector",
        {
            description: "Specifies the initialization vector (IV) value used to initialize the encryption cipher for the stream.\n\nThe IV acts like a starting seed, ensuring that encrypting identical data with the same key produces different encrypted outputs."
        }
    ],
    [
        "Encryption_Length",
        {
            description: "Indicates the bit length of the encryption key."
        }
    ],
    [
        "Encryption_Method",
        {
            description: "Specifies how encryption is structured across the media data."
        }
    ],
    [
        "Encryption_Mode",
        {
            description: "Specifies the block cipher mode of operation used for encryption."
        }
    ],
    [
        "Encryption_Padding",
        {
            description: "Specifies the padding scheme applied to align encrypted data blocks to the required cipher block size."
        }
    ],
    [
        "EPG_Positions_Begin",
        {
            displayName: "EPG Positions Begin",
            description: "Indicates the starting index of the Electronic Program Guide (EPG) schedule entries stored in this stream's internal parameter list.\n\nTools use this index alongside [EPG Positions End](#field:EPG_Positions_End) to locate and iterate through broadcast program listings."
        }
    ],
    [
        "EPG_Positions_End",
        {
            displayName: "EPG Positions End",
            description: "Indicates the ending index (exclusive) of the Electronic Program Guide (EPG) schedule entries stored in this stream's internal parameter list.\n\nSubtracting [EPG Positions Begin](#field:EPG_Positions_Begin) from this value gives the total number of broadcast program listings."
        }
    ],
    [
        "FileExtension",
        {
            description: "Indicates the extension of the file, excluding the directory path and file name."
        }
    ],
    [
        "FileExtension_Last",
        {
            description: "Indicates the extension of the last file in a sequence of files, excluding the directory path and file name."
        }
    ],
    [
        "FileName",
        {
            description: "Indicates the name of the file, excluding the directory path and extension."
        }
    ],
    [
        "FileName_Last",
        {
            description: "Indicates the name of the last file in a sequence of files, excluding the directory path and extension."
        }
    ],
    [
        "FileNameExtension",
        {
            description: "Indicates the name and extension of the file, excluding the directory path."
        }
    ],
    [
        "FileNameExtension_Last",
        {
            description: "Indicates the name and extension of the last file in a sequence of files, excluding the directory path."
        }
    ],
    [
        "FileSize",
        {
            description: "Indicates the total size of the file in bytes."
        }
    ],
    [
        "FileSize_String",
        {
            description: "Displays [File Size](#field:FileSize) as a human-readable string with its unit of measurement (calculated in powers of 1024)."
        }
    ],
    [
        "FileSize_String1",
        {
            description: "Displays [File Size](#field:FileSize) with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "FileSize_String2",
        {
            description: "Displays [File Size](#field:FileSize) with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "FileSize_String3",
        {
            description: "Displays [File Size](#field:FileSize) with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "FileSize_String4",
        {
            description: "Displays [File Size](#field:FileSize) with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
        }
    ],
    [
        "FirstPacketOrder",
        {
            description: "Identifies the zero-based position of the first fully decodable data packet for a specific media stream within a file.\n\nIn practice, demuxers and media players use this value to determine the physical interleaving order of streams in headerless containers (such as MPEG-TS), helping verify whether audio or video packets arrive first for initial buffer synchronization."
        }
    ],
    [
        "FolderName",
        {
            description: "Indicates the parent folder path containing the file, excluding the file name and extension."
        }
    ],
    [
        "FolderName_Last",
        {
            description: "Indicates the parent folder path containing the last file in a sequence of files, excluding the file name and extension."
        }
    ],
    [
        "FooterSize",
        {
            description: "Indicates the size (in bytes) of the footer data structure located at the end of the file or stream.\n\nTypically, the total [File Size](#field:FileSize) equals the sum of [Header Size](#field:HeaderSize), [Data Size](#field:DataSize), and Footer Size."
        }
    ],
    [
        "Format",
        {
            description: "Indicates the standardized name of the format, codec, or container used by the stream."
        }
    ],
    [
        "Format_AdditionalFeatures",
        {
            description: "Specifies any additional technical features or capabilities required to fully decode and support the format content."
        }
    ],
    [
        "Format_Commercial",
        {
            description: "Indicates the commercial or marketing name used by the vendor for these format settings, falling back to the standard format name if none exists."
        }
    ],
    [
        "Format_Commercial_IfAny",
        {
            description: "Indicates the commercial or marketing name used by the vendor for these format settings, if applicable."
        }
    ],
    [
        "Format_Compression",
        {
            description: "Specifies the compression method or algorithm used within the format."
        }
    ],
    [
        "Format_Extensions",
        {
            description: "Lists the common file name extensions associated with the identified format, separated by spaces."
        }
    ],
    [
        "Format_Info",
        {
            description: "Provides additional descriptive details or background information about the identified format."
        }
    ],
    [
        "Format_Level",
        {
            description: "Indicates the specific conformance level associated with the format specification."
        }
    ],
    [
        "Format_Profile",
        {
            description: "Specifies the particular profile or subset of the format standard used by the stream."
        }
    ],
    [
        "Format_Settings",
        {
            description: "Specifies advanced or non-default parameter settings required by the decoder to properly process the stream."
        }
    ],
    [
        "Format_String",
        {
            description: "Displays the format name combined with its additional features as a human-readable string."
        }
    ],
    [
        "Format_Url",
        {
            displayName: "Format URL",
            description: "Provides a reference URL containing official specifications or documentation for the format."
        }
    ],
    [
        "Format_Version",
        {
            description: "Specifies the version number of the identified format."
        }
    ],
    [
        "FrameCount",
        {
            description: "Indicates the total number of frames in the stream, provided the frame rate remains constant throughout the entire track."
        }
    ],
    [
        "FrameRate",
        {
            description: "Indicates the playback frame rate of the stream expressed in frames per second."
        }
    ],
    [
        "FrameRate_Den",
        {
            description: "Indicates the denominator component of the fractional [Frame Rate](#field:FrameRate) value."
        }
    ],
    [
        "FrameRate_Num",
        {
            description: "Indicates the numerator component of the fractional [Frame Rate](#field:FrameRate) value."
        }
    ],
    [
        "FrameRate_String",
        {
            description: "Displays [Frame Rate](#field:FrameRate) as a human-readable string with its unit of measurement."
        }
    ],
    [
        "GeneralCount",
        {
            displayName: "General Stream Count",
            description: "Indicates the total number of general container streams contained within the file."
        }
    ],
    [
        "HeaderSize",
        {
            description: "Indicates the size (in bytes) of the header data structure located at the beginning of the file or stream.\n\nTypically, the total [File Size](#field:FileSize) equals the sum of Header Size, [Data Size](#field:DataSize), and [Footer Size](#field:FooterSize)."
        }
    ],
    [
        "ID",
        {
            description: "Indicates the unique identification number or track ID assigned to this stream within the container."
        }
    ],
    [
        "ID_String",
        {
            description: "Displays [ID](#field:ID) as a human-readable string."
        }
    ],
    [
        "Image_Codec_List",
        {
            description: "A list of all image formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Image Format List](#field:Image_Format_List) instead."
        }
    ],
    [
        "Image_Format_List",
        {
            description: "A list of all image formats or codecs found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Image_Format_WithHint_List",
        {
            displayName: "Image Format List (with hint)",
            description: "A list of all image formats found in the file, separated by forward slashes (/), including common alternative codec names."
        }
    ],
    [
        "Image_Language_List",
        {
            description: "A list of all image stream languages found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "ImageCount",
        {
            displayName: "Image Stream Count",
            description: "Indicates the total number of image streams (or tracks) contained within the media file."
        }
    ],
    [
        "Inform",
        {
            description: "Contains the complete, human-readable text summary report generated by MediaInfo for this stream."
        }
    ],
    [
        "Interleaved",
        {
            description: "Indicates whether audio and video streams are interleaved (multiplexed) together within the container."
        }
    ],
    [
        "InternetMediaType",
        {
            description: "Specifies the Internet media type (also known as MIME type or Content-Type) associated with the file format."
        }
    ],
    [
        "IsStreamable",
        {
            displayName: "Streamable",
            description: "Indicates whether the file is structured to support streaming playback (such as progressive HTTP download or web streaming)."
        }
    ],
    [
        "Menu_Codec_List",
        {
            description: "A list of all menu formats found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Menu Format List](#field:Menu_Format_List) instead."
        }
    ],
    [
        "Menu_Format_List",
        {
            description: "A list of all menu formats found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Menu_Format_WithHint_List",
        {
            displayName: "Menu Format List (with hint)",
            description: "A list of all menu formats found in the file, separated by forward slashes (/), including common alternative names."
        }
    ],
    [
        "Menu_Language_List",
        {
            description: "A list of all menu stream languages found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "MenuCount",
        {
            displayName: "Menu Stream Count",
            description: "Indicates the total number of menu streams contained within the file."
        }
    ],
    [
        "MenuID",
        {
            description: "Indicates the unique identification number assigned to a menu stream."
        }
    ],
    [
        "MenuID_String",
        {
            description: "Displays [Menu ID](#field:MenuID) as a human-readable string."
        }
    ],
    [
        "OriginalSourceMedium_ID",
        {
            description: "Indicates the identification tag for this stream taken from the original source medium metadata."
        }
    ],
    [
        "OriginalSourceMedium_ID_String",
        {
            description: "Displays [Original Source Medium ID](#field:OriginalSourceMedium_ID) as a human-readable string."
        }
    ],
    [
        "Other_Codec_List",
        {
            description: "A list of all auxiliary data formats found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Other Format List](#field:Other_Format_List) instead."
        }
    ],
    [
        "Other_Format_List",
        {
            description: "A list of all auxiliary data formats found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Other_Format_WithHint_List",
        {
            displayName: "Other Format List (with hint)",
            description: "A list of all auxiliary data formats found in the file, separated by forward slashes (/), including common alternative names."
        }
    ],
    [
        "Other_Language_List",
        {
            description: "A list of all auxiliary stream languages (such as chapters) found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "OtherCount",
        {
            displayName: "Other Stream Count",
            description: "Indicates the total number of auxiliary or miscellaneous streams contained within the file."
        }
    ],
    [
        "OverallBitRate",
        {
            description: "Indicates the combined bit rate of all streams in the file, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Maximum",
        {
            description: "Indicates the peak combined [Overall Bit Rate](#field:OverallBitRate) across all streams in the file, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Maximum_String",
        {
            description: "Displays [Overall Bit Rate Maximum](#field:OverallBitRate_Maximum) as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_Minimum",
        {
            description: "Indicates the lowest combined [Overall Bit Rate](#field:OverallBitRate) across all streams in the file, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Minimum_String",
        {
            description: "Displays [Overall Bit Rate Minimum](#field:OverallBitRate_Minimum) as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_Mode",
        {
            description: "Indicates the bit rate control mode used for [Overall Bit Rate](#field:OverallBitRate) across all streams."
        }
    ],
    [
        "OverallBitRate_Mode_String",
        {
            description: "Displays [Overall Bit Rate Mode](#field:OverallBitRate_Mode) as a human-readable word."
        }
    ],
    [
        "OverallBitRate_Nominal",
        {
            displayName: "Overall Bit Rate (Nominal)",
            description: "Indicates the nominal (target) bit rate for all streams combined, expressed in bits per second (bps).\n\nUnlike [Overall Bit Rate](#field:OverallBitRate), which reflects the actual average data rate of the file, this value represents the intended bit rate that the encoder was instructed to aim for."
        }
    ],
    [
        "OverallBitRate_Nominal_String",
        {
            description: "Displays [Overall Bit Rate (Nominal)](#field:OverallBitRate_Nominal) as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_String",
        {
            description: "Displays [Overall Bit Rate](#field:OverallBitRate) as a human-readable string with its unit of measurement."
        }
    ],
    [
        "PackageName",
        {
            displayName: "Package Name",
            description: "Indicates the human-readable name assigned to a media package inside an MXF (Material eXchange Format) container.\n\nIn broadcast and cinema, cameras and editing software store identifiers here so media can be tracked and relinked even if the file is renamed on disk."
        }
    ],
    [
        "Status",
        {
            description: "An internal MediaInfo bitmask tracking which parsing stages have completed for this stream (such as accepted, filled, updated, or finished)."
        }
    ],
    [
        "StreamCount",
        {
            description: "Indicates the total number of available streams for a specific stream kind."
        }
    ],
    [
        "StreamKind",
        {
            description: "Indicates the type of media stream (such as Audio, General, Image, Menu, Other, Text, or Video)."
        }
    ],
    [
        "StreamKind_String",
        {
            description: "Displays [Stream Kind](#field:StreamKind) as a human-readable string."
        }
    ],
    [
        "StreamKindID",
        {
            description: "Indicates the zero-based identification number assigned to the stream in order of parsing, grouped by [Stream Kind](#field:StreamKind).\n\nThis is the zero-based counterpart to [Stream Kind Position](#field:StreamKindPos)."
        }
    ],
    [
        "StreamKindPos",
        {
            displayName: "Stream Kind Position",
            description: "Indicates the one-based position number of the stream when multiple streams of the same [Stream Kind](#field:StreamKind) exist, assigned in order of parsing.\n\nThis is the one-based counterpart to [Stream Kind ID](#field:StreamKindID)."
        }
    ],
    [
        "StreamOrder",
        {
            description: "Indicates the zero-based sequential position of the stream within the container across all stream types."
        }
    ],
    [
        "StreamSize",
        {
            description: "Indicates the size of the individual stream payload in bytes."
        }
    ],
    [
        "StreamSize_Demuxed",
        {
            description: "Indicates the size of the stream in bytes after being demuxed from the container, excluding container framing overhead present in [Stream Size](#field:StreamSize)."
        }
    ],
    [
        "StreamSize_Demuxed_String",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_Demuxed_String1",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "StreamSize_Demuxed_String2",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String3",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String4",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String5",
        {
            description: "Displays [Stream Size Demuxed](#field:StreamSize_Demuxed) as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_Proportion",
        {
            description: "Indicates the proportion of the total [File Size](#field:FileSize) occupied by [Stream Size](#field:StreamSize)."
        }
    ],
    [
        "StreamSize_String",
        {
            description: "Displays [Stream Size](#field:StreamSize) as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_String1",
        {
            description: "Displays [Stream Size](#field:StreamSize) with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "StreamSize_String2",
        {
            description: "Displays [Stream Size](#field:StreamSize) with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "StreamSize_String3",
        {
            description: "Displays [Stream Size](#field:StreamSize) with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "StreamSize_String4",
        {
            description: "Displays [Stream Size](#field:StreamSize) with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
        }
    ],
    [
        "StreamSize_String5",
        {
            description: "Displays [Stream Size](#field:StreamSize) as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "Text_Codec_List",
        {
            description: "A list of all text formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Text Format List](#field:Text_Format_List) instead."
        }
    ],
    [
        "Text_Format_List",
        {
            description: "A list of all text formats or codecs found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Text_Format_WithHint_List",
        {
            displayName: "Text Format List (with hint)",
            description: "A list of all text formats found in the file, separated by forward slashes (/), including common alternative names."
        }
    ],
    [
        "Text_Language_List",
        {
            description: "A list of all text stream languages found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "TextCount",
        {
            displayName: "Text Stream Count",
            description: "Indicates the total number of text streams (or tracks) contained within the media file."
        }
    ],
    [
        "UMID",
        {
            description: "Indicates the Unique Material Identifier (standardized by SMPTE 330M), a globally unique 32- or 64-byte hexadecimal ID generated by cameras and editing systems (usually within MXF containers) to permanently identify a specific piece of media.\n\nUnlike [Package Name](#field:PackageName), a UMID guarantees no two clips share the same ID, allowing editing software to reliably match and relink footage."
        }
    ],
    [
        "UniqueID",
        {
            description: "Indicates the unique identification string for this stream, intended to be preserved during stream copy operations."
        }
    ],
    [
        "UniqueID_String",
        {
            description: "Displays [Unique ID](#field:UniqueID) as a human-readable string."
        }
    ],
    [
        "UniversalAdID_Registry",
        {
            displayName: "Universal Ad-ID Registry",
            description: "Indicates the issuing authority or domain (such as `ad-id.org` or `clearcast.co.uk`) that registered the commercial's Universal Ad-ID.\n\nBroadcast networks and streaming platforms pair this registry name with the [Universal Ad-ID Value](#field:UniversalAdID_Value) to uniquely track advertisements across regions and distribution channels."
        }
    ],
    [
        "UniversalAdID_String",
        {
            displayName: "Universal Ad-ID String",
            description: "Displays the complete Universal Ad-ID formatted as a single human-readable string combining the [Universal Ad-ID Value](#field:UniversalAdID_Value) and [Universal Ad-ID Registry](#field:UniversalAdID_Registry)."
        }
    ],
    [
        "UniversalAdID_Value",
        {
            displayName: "Universal Ad-ID Value",
            description: "Indicates the unique alphanumeric code assigned to a commercial asset by the organization specified in [Universal Ad-ID Registry](#field:UniversalAdID_Registry) for broadcast and streaming ad tracking."
        }
    ],
    [
        "Video_Codec_List",
        {
            description: "A list of all video formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use [Video Format List](#field:Video_Format_List) instead."
        }
    ],
    [
        "Video_Format_List",
        {
            description: "A list of all video formats or codecs found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "Video_Format_WithHint_List",
        {
            displayName: "Video Format List (with hint)",
            description: "A list of all video formats found in the file, separated by forward slashes (/), including common alternative codec names."
        }
    ],
    [
        "Video_Language_List",
        {
            description: "A list of all video stream languages found in the file, separated by forward slashes (/)."
        }
    ],
    [
        "VideoCount",
        {
            displayName: "Video Stream Count",
            description: "Indicates the total number of video streams (or tracks) contained within the media file."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Classification
    [
        "ContentType",
        {
            description: "Indicates the high-level content category (such as Movie, TV Show, Music, or Podcast), distinct from its artistic [Genre](#field:Genre)."
        }
    ],
    [
        "Description",
        {
            description: "Provides a short descriptive summary of the content."
        }
    ],
    [
        "Genre",
        {
            description: "Indicates the primary genre of the media."
        }
    ],
    [
        "ICRA",
        {
            displayName: "ICRA Rating",
            description: "Indicates the Internet Content Rating Association (ICRA) content and age advisory rating (formerly known as RSACi).\n\nUsed primarily in legacy Windows Media (WMV/ASF) metadata to classify sensitive themes like violence, language, and nudity for parental control filtering."
        }
    ],
    [
        "Keywords",
        {
            description: "A comma-separated list of keywords associated with the content, used for searching and tagging."
        }
    ],
    [
        "LawRating",
        {
            description: "Indicates the legal or age rating of a movie, with the format depending on the country of origin."
        }
    ],
    [
        "LawRating_Reason",
        {
            description: "Specifies the reason or justification for the assigned legal or age rating."
        }
    ],
    [
        "Mood",
        {
            description: "Reflects the intended mood or emotional tone of the item using descriptive keywords."
        }
    ],
    [
        "Period",
        {
            description: "Describes the historical time period that the piece depicts or originates from."
        }
    ],
    [
        "PodcastCategory",
        {
            description: "Indicates the designated category of the podcast."
        }
    ],
    [
        "Subject",
        {
            description: "Describes the main topic or subject matter of the file."
        }
    ],
    [
        "Summary",
        {
            description: "Provides a plot outline or summary of the story."
        }
    ],
    [
        "Synopsis",
        {
            description: "Provides a description of the storyline of the item."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Entity
    [
        "Accompaniment",
        {
            description: "Indicates the supporting band, orchestra, ensemble, or session musician(s) accompanying the main [Performer](#field:Performer)."
        }
    ],
    [
        "Actor",
        {
            description: "Indicates the real name of an actor or actress performing in the production."
        }
    ],
    [
        "Actor_Character",
        {
            description: "Indicates the name of the character portrayed by the [Actor](#field:Actor) in the production."
        }
    ],
    [
        "Album_Performer",
        {
            description: "Indicates the primary artist or performer credited for the entire album."
        }
    ],
    [
        "Album_Performer_Sort",
        {
            description: "Provides an alternate version of [Album Performer](#field:Album_Performer) formatted for alphabetical sorting."
        }
    ],
    [
        "Album_Performer_Url",
        {
            displayName: "Album Performer URL",
            description: "Provides the official website or homepage URL for the [Album Performer](#field:Album_Performer)."
        }
    ],
    [
        "Arranger",
        {
            description: "Indicates the person who adapted or arranged the musical composition for performance."
        }
    ],
    [
        "ArtDirector",
        {
            description: "Indicates the person responsible for overseeing the artists and craftspeople who build the sets and visual environments."
        }
    ],
    [
        "AssistantDirector",
        {
            description: "Indicates the assistant director who supports the [Director](#field:Director) with production scheduling and on-set management."
        }
    ],
    [
        "Choreographer",
        {
            description: "Indicates the person who designed and directed the dance or movement sequences."
        }
    ],
    [
        "CoDirector",
        {
            displayName: "Co-Director",
            description: "Indicates a co-director sharing creative direction duties alongside the primary [Director](#field:Director)."
        }
    ],
    [
        "CommissionedBy",
        {
            description: "Indicates the person or organization that commissioned the creation of the work."
        }
    ],
    [
        "Composer",
        {
            description: "Indicates the person who composed the original musical piece or score."
        }
    ],
    [
        "Composer_Nationality",
        {
            description: "Indicates the nationality of the primary [Composer](#field:Composer)."
        }
    ],
    [
        "Composer_Sort",
        {
            description: "Provides an alternate version of [Composer](#field:Composer) formatted for alphabetical sorting."
        }
    ],
    [
        "Conductor",
        {
            description: "Indicates the person who conducted the orchestra, choir, or musical ensemble."
        }
    ],
    [
        "CoProducer",
        {
            displayName: "Co-Producer",
            description: "Indicates a co-producer sharing production duties alongside the primary [Producer](#field:Producer)."
        }
    ],
    [
        "CostumeDesigner",
        {
            description: "Indicates the person responsible for designing the costumes and wardrobe for the production."
        }
    ],
    [
        "Director",
        {
            description: "Indicates the primary director of the film, episode, or video production."
        }
    ],
    [
        "DirectorOfPhotography",
        {
            description: "Indicates the director of photography (cinematographer) responsible for camera work and lighting."
        }
    ],
    [
        "DistributedBy",
        {
            description: "Indicates the company or organization responsible for distributing the media."
        }
    ],
    [
        "EditedBy",
        {
            description: "Indicates the editor responsible for assembling and cutting the final audio or video."
        }
    ],
    [
        "EncodedBy",
        {
            description: "Indicates the person or organization that encoded or ripped the media file."
        }
    ],
    [
        "ExecutiveProducer",
        {
            description: "Indicates an executive producer overseeing the financing or high-level production of the media."
        }
    ],
    [
        "Label",
        {
            description: "Indicates the record label brand or trademark associated with marketing the music recording or video."
        }
    ],
    [
        "Lyricist",
        {
            description: "Indicates the person who wrote the lyrics for the musical piece."
        }
    ],
    [
        "MasteredBy",
        {
            description: "Indicates the mastering engineer who prepared the final audio mix for physical or digital release."
        }
    ],
    [
        "MusicBy",
        {
            description: "Indicates the primary musical artist or score [Composer](#field:Composer) credited for the media."
        }
    ],
    [
        "Original_Lyricist",
        {
            description: "Indicates the original [Lyricist](#field:Lyricist) or text writer, typically credited when the track is a cover, translation, or adaptation."
        }
    ],
    [
        "Original_Performer",
        {
            description: "Indicates the original [Performer](#field:Performer) or artist, typically credited when the track is a cover or remix."
        }
    ],
    [
        "OriginalSourceForm_DistributedBy",
        {
            description: "Indicates the person or organization that supplied or distributed the original source medium from which this file was created."
        }
    ],
    [
        "Performer",
        {
            description: "Indicates the primary artist(s) or performer(s) featured in the track or production."
        }
    ],
    [
        "Performer_Sort",
        {
            description: "Provides an alternate version of [Performer](#field:Performer) formatted for alphabetical sorting."
        }
    ],
    [
        "Performer_Url",
        {
            displayName: "Performer URL",
            description: "Provides the official website or homepage URL for the [Performer](#field:Performer)."
        }
    ],
    [
        "Producer",
        {
            description: "Indicates the primary producer responsible for overseeing the creation of the media."
        }
    ],
    [
        "ProductionDesigner",
        {
            description: "Indicates the person responsible for designing the overall visual aesthetic and physical look of the production."
        }
    ],
    [
        "ProductionStudio",
        {
            description: "Indicates the primary studio or production company that created the media."
        }
    ],
    [
        "Publisher",
        {
            description: "Indicates the organization or [Label](#field:Label) responsible for publishing the media."
        }
    ],
    [
        "Publisher_URL",
        {
            displayName: "Publisher URL",
            description: "Provides the official website URL for the [Publisher](#field:Publisher)."
        }
    ],
    [
        "RemixedBy",
        {
            description: "Indicates the artist(s) or producer(s) who remixed or reinterpreted the original track."
        }
    ],
    [
        "ScreenplayBy",
        {
            description: "Indicates the author of the screenplay or shooting script for a film or television production."
        }
    ],
    [
        "SoundEngineer",
        {
            description: "Indicates the sound engineer or audio recordist responsible for capturing or mixing the audio."
        }
    ],
    [
        "ThanksTo",
        {
            description: "Lists acknowledgments or special thanks to individuals and organizations involved in the production."
        }
    ],
    [
        "WrittenBy",
        {
            description: "Indicates the author of the underlying story, script, or written work."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Identifier
    [
        "BarCode",
        {
            displayName: "Barcode",
            description: "Indicates the retail barcode identifier printed on the physical product packaging, typically formatted as a 13-digit EAN (European Article Number) or 12-digit UPC (Universal Product Code) for point-of-sale and inventory tracking."
        }
    ],
    [
        "CatalogNumber",
        {
            description: "Indicates the internal catalog identifier assigned by the record [Label](#field:Label) or [Publisher](#field:Publisher) to uniquely track a specific release within their own discography or distribution system."
        }
    ],
    [
        "ISAN",
        {
            displayName: "ISAN",
            description: "Indicates the International Standard Audiovisual Number (ISO 15706), a globally unique identifier assigned to audiovisual works—such as films, television episodes, and broadcasts—to track the underlying work across different versions, languages, and distribution formats."
        }
    ],
    [
        "ISBN",
        {
            displayName: "ISBN",
            description: "Indicates the International Standard Book Number, a globally unique commercial identifier assigned to books and book-like publications, commonly found in audiobook or bundled print-media metadata."
        }
    ],
    [
        "ISRC",
        {
            displayName: "ISRC",
            description: "Indicates the International Standard Recording Code (ISO 3901), a unique identifier assigned to an individual sound or music video recording to track royalties, airplay, and digital streaming usage across platforms."
        }
    ],
    [
        "LabelCode",
        {
            description: "Indicates the numeric Label Code (LC) assigned by the German collecting society GVL to identify the specific record [Label](#field:Label) or rights holder for broadcast and performance royalty collection."
        }
    ],
    [
        "LCCN",
        {
            displayName: "LCCN",
            description: "Indicates the Library of Congress Control Number, a unique serial number assigned by the United States Library of Congress to catalog and index published books, audio recordings, and audiovisual works."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Info
    [
        "Cover",
        {
            description: "Indicates whether cover art or embedded album artwork is present in the media file."
        }
    ],
    [
        "Cover_Data",
        {
            description: "Contains the Base64-encoded binary image data of the embedded [Cover](#field:Cover) art."
        }
    ],
    [
        "Cover_Description",
        {
            description: "Provides a descriptive caption or label associated with the embedded [Cover](#field:Cover) art."
        }
    ],
    [
        "Cover_Mime",
        {
            displayName: "Cover MIME Type",
            description: "Specifies the MIME type (image format) of the embedded [Cover](#field:Cover) art."
        }
    ],
    [
        "Cover_Type",
        {
            description: "Indicates the role or classification of the embedded [Cover](#field:Cover) art within the release (such as front cover, back cover, or artist photo)."
        }
    ],
    [
        "Lyrics",
        {
            description: "Contains the embedded song lyrics or vocal text associated with the audio track."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Legal
    [
        "Copyright",
        {
            description: "Indicates the copyright notice or legal ownership statement for the media content."
        }
    ],
    [
        "Copyright_Url",
        {
            displayName: "Copyright URL",
            description: "Provides a reference URL with additional details regarding the [Copyright](#field:Copyright) notice or licensing terms."
        }
    ],
    [
        "Country",
        {
            description: "Indicates the country where the content was produced, broadcast, or legally registered."
        }
    ],
    [
        "NetworkName",
        {
            description: "Indicates the name of the broadcast network or television channel airing or distributing the stream."
        }
    ],
    [
        "OriginalNetworkName",
        {
            description: "Indicates the name of the original broadcast network that first aired or produced the content, if rebroadcast by another [Network Name](#field:NetworkName)."
        }
    ],
    [
        "Owner",
        {
            description: "Indicates the legal owner or rights holder of the file or media content."
        }
    ],
    [
        "Producer_Copyright",
        {
            description: "Indicates the copyright notice specifically held by the [Producer](#field:Producer) or production company."
        }
    ],
    [
        "Service_Url",
        {
            displayName: "Service URL",
            description: "Provides the official website URL associated with the broadcast or streaming [Service Name](#field:ServiceName)."
        }
    ],
    [
        "ServiceChannel",
        {
            description: "Indicates the logical channel number or virtual channel identifier assigned to the broadcast service."
        }
    ],
    [
        "ServiceName",
        {
            description: "Indicates the name of the broadcast service, station, or digital stream (such as a DVB or ATSC channel name)."
        }
    ],
    [
        "ServiceProvider",
        {
            description: "Indicates the company or broadcast operator providing the [Service Name](#field:ServiceName)."
        }
    ],
    [
        "ServiceProvider_Url",
        {
            displayName: "Service Provider URL",
            description: "Provides the official website URL for the [Service Provider](#field:ServiceProvider)."
        }
    ],
    [
        "ServiceType",
        {
            description: "Indicates the category of the broadcast service (such as digital television, radio, or teletext)."
        }
    ],
    [
        "TermsOfUse",
        {
            description: "Specifies the terms of use, licensing conditions, or usage restrictions governing the media file."
        }
    ],
    [
        "TimeZone",
        {
            description: "Indicates the time zone offset associated with the broadcast schedule or recorded timestamps."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Personal
    [
        "Added_Date",
        {
            description: "Indicates the date and time when the media file was added to the user's library or collection."
        }
    ],
    [
        "Comment",
        {
            description: "Contains general user comments, notes, or miscellaneous remarks embedded in the file metadata."
        }
    ],
    [
        "Played_Count",
        {
            description: "Indicates the number of times the media file has been played."
        }
    ],
    [
        "Played_First_Date",
        {
            description: "Indicates the date and time when the media file was first played."
        }
    ],
    [
        "Played_Last_Date",
        {
            description: "Indicates the date and time when the media file was most recently played."
        }
    ],
    [
        "Rating",
        {
            description: "Indicates the user's personal preference or star rating assigned to the media item, distinct from official age or content advisories like [Law Rating](#field:LawRating)."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Spatial
    [
        "Archival_Location",
        {
            description: "Indicates the physical storage location or archive where the original source medium is kept."
        }
    ],
    [
        "Recorded_Location",
        {
            description: "Indicates the geographic location, venue, or studio where the media was recorded."
        }
    ],
    [
        "Written_Location",
        {
            description: "Indicates the geographic location where the script, lyrics, or composition was written."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Technical
    [
        "BPM",
        {
            displayName: "BPM",
            description: "Indicates the tempo of the music track in beats per minute (BPM)."
        }
    ],
    [
        "Cropped",
        {
            description: "Indicates whether the media was cropped during capture or processing."
        }
    ],
    [
        "Dimensions",
        {
            description: "Indicates the physical dimensions of the original source medium before digitization."
        }
    ],
    [
        "DotsPerInch",
        {
            description: "Indicates the scanning or digitization resolution of the source medium, expressed in dots per inch (DPI)."
        }
    ],
    [
        "Encoded_Application",
        {
            description: "Indicates the software application used to create, mux, or encode the file, distinct from the underlying [Encoded Library](#field:Encoded_Library)."
        }
    ],
    [
        "Encoded_Application_CompanyName",
        {
            description: "Indicates the developer or vendor company behind the [Encoded Application](#field:Encoded_Application)."
        }
    ],
    [
        "Encoded_Application_Name",
        {
            description: "Indicates the standalone product name of the [Encoded Application](#field:Encoded_Application), excluding version details."
        }
    ],
    [
        "Encoded_Application_String",
        {
            description: "Displays [Encoded Application](#field:Encoded_Application) combined with its version and vendor details as a human-readable string."
        }
    ],
    [
        "Encoded_Application_Url",
        {
            displayName: "Encoded Application URL",
            description: "Provides the official website URL for the [Encoded Application](#field:Encoded_Application)."
        }
    ],
    [
        "Encoded_Application_Version",
        {
            description: "Specifies the version number of the [Encoded Application](#field:Encoded_Application)."
        }
    ],
    [
        "Encoded_Hardware",
        {
            description: "Indicates the hardware device, camera, or dedicated encoder unit used to record or encode the media."
        }
    ],
    [
        "Encoded_Hardware_CompanyName",
        {
            description: "Indicates the manufacturer of the [Encoded Hardware](#field:Encoded_Hardware)."
        }
    ],
    [
        "Encoded_Hardware_Model",
        {
            description: "Specifies the model identifier of the [Encoded Hardware](#field:Encoded_Hardware)."
        }
    ],
    [
        "Encoded_Hardware_Name",
        {
            description: "Indicates the product name of the [Encoded Hardware](#field:Encoded_Hardware)."
        }
    ],
    [
        "Encoded_Hardware_String",
        {
            description: "Displays [Encoded Hardware](#field:Encoded_Hardware) combined with its manufacturer and model details as a human-readable string."
        }
    ],
    [
        "Encoded_Hardware_Version",
        {
            description: "Specifies the hardware revision or firmware version of the [Encoded Hardware](#field:Encoded_Hardware)."
        }
    ],
    [
        "Encoded_Library",
        {
            description: "Indicates the underlying codec library or software engine used to encode the stream, distinct from the front-end [Encoded Application](#field:Encoded_Application)."
        }
    ],
    [
        "Encoded_Library_CompanyName",
        {
            displayName: "Encoded Library Company Name",
            description: "Indicates the developer or organization behind the [Encoded Library](#field:Encoded_Library)."
        }
    ],
    [
        "Encoded_Library_Date",
        {
            description: "Indicates the build or release date of the [Encoded Library](#field:Encoded_Library)."
        }
    ],
    [
        "Encoded_Library_Name",
        {
            description: "Indicates the standalone name of the [Encoded Library](#field:Encoded_Library), excluding version and build details."
        }
    ],
    [
        "Encoded_Library_Settings",
        {
            description: "Lists the raw encoder parameters, flags, and configuration options passed to the [Encoded Library](#field:Encoded_Library) during encoding."
        }
    ],
    [
        "Encoded_Library_String",
        {
            description: "Displays [Encoded Library](#field:Encoded_Library) combined with its version and build date as a human-readable string."
        }
    ],
    [
        "Encoded_Library_Version",
        {
            description: "Specifies the version number of the [Encoded Library](#field:Encoded_Library)."
        }
    ],
    [
        "Encoded_OperatingSystem",
        {
            displayName: "Encoded Operating System",
            description: "Indicates the operating system environment on which the file was encoded or muxed."
        }
    ],
    [
        "Encoded_OperatingSystem_CompanyName",
        {
            displayName: "Encoded Operating System Company Name",
            description: "Indicates the vendor or organization behind the [Encoded Operating System](#field:Encoded_OperatingSystem)."
        }
    ],
    [
        "Encoded_OperatingSystem_Name",
        {
            displayName: "Encoded Operating System Name",
            description: "Indicates the standalone name of the [Encoded Operating System](#field:Encoded_OperatingSystem), excluding version details."
        }
    ],
    [
        "Encoded_OperatingSystem_String",
        {
            displayName: "Encoded Operating System String",
            description: "Displays [Encoded Operating System](#field:Encoded_OperatingSystem) combined with its version details as a human-readable string."
        }
    ],
    [
        "Encoded_OperatingSystem_Version",
        {
            displayName: "Encoded Operating System Version",
            description: "Specifies the version or build number of the [Encoded Operating System](#field:Encoded_OperatingSystem)."
        }
    ],
    [
        "Lightness",
        {
            description: "Indicates the relative brightness or lightness level recorded during the digitization of the source medium."
        }
    ],
    [
        "OriginalSourceForm",
        {
            description: "Indicates the physical format or medium type of the original source material before digitization (such as film, magnetic tape, or vinyl)."
        }
    ],
    [
        "OriginalSourceForm_Cropped",
        {
            description: "Indicates whether the [Original Source Form](#field:OriginalSourceForm) was cropped during transfer or digitization."
        }
    ],
    [
        "OriginalSourceForm_Name",
        {
            description: "Indicates the title or descriptive name of the [Original Source Form](#field:OriginalSourceForm)."
        }
    ],
    [
        "OriginalSourceForm_NumColors",
        {
            displayName: "Original Source Form Number of Colors",
            description: "Indicates the number of colors or color depth present in the [Original Source Form](#field:OriginalSourceForm) when digitizing visual material."
        }
    ],
    [
        "OriginalSourceForm_Sharpness",
        {
            description: "Indicates the sharpness setting or visual clarity level recorded when digitizing the [Original Source Form](#field:OriginalSourceForm)."
        }
    ],
    [
        "OriginalSourceMedium",
        {
            description: "Indicates the physical carrier or storage medium of the original recording (such as CD, DVD, Blu-ray, or cassette)."
        }
    ],
    [
        "Tagged_Application",
        {
            description: "Indicates the software application used to write or edit the metadata tags inside the file, which may differ from the [Encoded Application](#field:Encoded_Application)."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Temporal
    [
        "Encoded_Date",
        {
            description: "Indicates the date and time when the media file or stream was encoded or muxed."
        }
    ],
    [
        "File_Created_Date",
        {
            description: "Indicates the filesystem creation date and time of the file, reported in Coordinated Universal Time (UTC)."
        }
    ],
    [
        "File_Created_Date_Local",
        {
            description: "Indicates the filesystem creation date and time of the file, reported in the local time zone rather than UTC as in [File Created Date](#field:File_Created_Date)."
        }
    ],
    [
        "File_Modified_Date",
        {
            description: "Indicates the filesystem last-modified date and time of the file, reported in Coordinated Universal Time (UTC)."
        }
    ],
    [
        "File_Modified_Date_Local",
        {
            description: "Indicates the filesystem last-modified date and time of the file, reported in the local time zone rather than UTC as in [File Modified Date](#field:File_Modified_Date)."
        }
    ],
    [
        "Mastered_Date",
        {
            description: "Indicates the date when the audio or video master was finalized for physical or digital release."
        }
    ],
    [
        "Original_Released_Date",
        {
            description: "Indicates the original release date of the underlying work, distinct from [Released Date](#field:Released_Date) when the file is a reissue, remaster, or later edition."
        }
    ],
    [
        "Recorded_Date",
        {
            description: "Indicates the date and time when the audio or video content was originally recorded or captured."
        }
    ],
    [
        "Released_Date",
        {
            description: "Indicates the date when this specific edition, broadcast, or release of the media was published."
        }
    ],
    [
        "Tagged_Date",
        {
            description: "Indicates the date and time when the metadata tags were written or last updated in the file."
        }
    ],
    [
        "Written_Date",
        {
            description: "Indicates the date when the underlying script, lyrics, or musical composition was written."
        }
    ],

    //? https://mediainfo.js.org/api/interface/GeneralTrack/#Title
    [
        "Album",
        {
            description: "Indicates the title of the album, collection, or release to which the track belongs."
        }
    ],
    [
        "Album_More",
        {
            description: "Provides additional descriptive details or subtitle information associated with the [Album](#field:Album)."
        }
    ],
    [
        "Album_Sort",
        {
            description: "Provides an alternate version of [Album](#field:Album) formatted for alphabetical sorting."
        }
    ],
    [
        "Chapter",
        {
            description: "Indicates the name or title of the chapter within the media file."
        }
    ],
    [
        "Collection",
        {
            description: "Indicates the name of the broader franchise, anthology, or multi-work collection to which the media belongs."
        }
    ],
    [
        "Comic",
        {
            description: "Indicates the title of the comic book or graphic novel series associated with the media."
        }
    ],
    [
        "Comic_More",
        {
            description: "Provides additional descriptive details or issue subtitle information associated with the [Comic](#field:Comic)."
        }
    ],
    [
        "Comic_Position_Total",
        {
            description: "Indicates the total number of issues or volumes in the [Comic](#field:Comic) series."
        }
    ],
    [
        "Compilation",
        {
            description: "Indicates whether the track belongs to a compilation album featuring various artists or previously released material."
        }
    ],
    [
        "Compilation_String",
        {
            description: "Displays [Compilation](#field:Compilation) as a human-readable string."
        }
    ],
    [
        "Domain",
        {
            description: "Indicates the overarching thematic universe, franchise world, or broader series group to which the title belongs."
        }
    ],
    [
        "Grouping",
        {
            description: "Indicates a custom category or work-level grouping used by media players to organize related tracks (such as movements of a classical symphony)."
        }
    ],
    [
        "Movie",
        {
            description: "Indicates the title of the film or feature-length video production."
        }
    ],
    [
        "Movie_More",
        {
            description: "Provides additional descriptive details, taglines, or subtitle information associated with the [Movie](#field:Movie)."
        }
    ],
    [
        "Movie_Url",
        {
            displayName: "Movie URL",
            description: "Provides an official webpage or reference URL for the [Movie](#field:Movie)."
        }
    ],
    [
        "Original_Album",
        {
            description: "Indicates the title of the [Album](#field:Album) on which the track was originally released."
        }
    ],
    [
        "Original_Movie",
        {
            description: "Indicates the original title of the [Movie](#field:Movie), typically used when the file holds a localized, translated, or remake title."
        }
    ],
    [
        "Original_Part",
        {
            description: "Indicates the original title or identifier of the [Part](#field:Part) before adaptation or localization."
        }
    ],
    [
        "Original_Track",
        {
            description: "Indicates the original title of the [Track](#field:Track), typically used for covers, translations, or remixes."
        }
    ],
    [
        "Part",
        {
            description: "Indicates the title or name of a multi-part division within a work (such as an act, disc, volume, or episode segment)."
        }
    ],
    [
        "Part_Position",
        {
            description: "Indicates the sequential number of the current [Part](#field:Part) within the work."
        }
    ],
    [
        "Part_Position_Total",
        {
            description: "Indicates the total number of parts in the work, paired with [Part Position](#field:Part_Position)."
        }
    ],
    [
        "Reel",
        {
            description: "Indicates the name or identifier of the physical film reel or tape roll from which the segment originates."
        }
    ],
    [
        "Reel_Position",
        {
            description: "Indicates the sequential number of the current [Reel](#field:Reel) within the production."
        }
    ],
    [
        "Reel_Position_Total",
        {
            description: "Indicates the total number of reels in the production, paired with [Reel Position](#field:Reel_Position)."
        }
    ],
    [
        "Season",
        {
            description: "Indicates the title or name of the television or series season."
        }
    ],
    [
        "Season_Position",
        {
            description: "Indicates the sequential season number within the series."
        }
    ],
    [
        "Season_Position_Total",
        {
            description: "Indicates the total number of seasons in the series, paired with [Season Position](#field:Season_Position)."
        }
    ],
    [
        "SubTrack",
        {
            displayName: "Sub-Track",
            description: "Indicates the title of a sub-track, movement, or embedded chapter segment within a larger [Track](#field:Track)."
        }
    ],
    [
        "Title",
        {
            description: "Indicates the primary title of the media file or piece of content."
        }
    ],
    [
        "Title_More",
        {
            description: "Provides additional descriptive details, version notes, or subtitle information associated with the [Title](#field:Title)."
        }
    ],
    [
        "Title_Url",
        {
            displayName: "Title URL",
            description: "Provides an official webpage or reference URL associated with the [Title](#field:Title)."
        }
    ],
    [
        "Track",
        {
            description: "Indicates the title of the individual song, audio track, or episode."
        }
    ],
    [
        "Track_More",
        {
            description: "Provides additional descriptive details, mix notes, or subtitle information associated with the [Track](#field:Track)."
        }
    ],
    [
        "Track_Position",
        {
            description: "Indicates the sequential track or episode number of the [Track](#field:Track) within its [Album](#field:Album) or [Season](#field:Season)."
        }
    ],
    [
        "Track_Position_Total",
        {
            description: "Indicates the total number of tracks or episodes in the [Album](#field:Album) or [Season](#field:Season), paired with [Track Position](#field:Track_Position)."
        }
    ],
    [
        "Track_Sort",
        {
            description: "Provides an alternate version of [Track](#field:Track) formatted for alphabetical sorting."
        }
    ],
    [
        "Track_Url",
        {
            displayName: "Track URL",
            description: "Provides an official webpage or reference URL for the [Track](#field:Track)."
        }
    ],

    //? Extra fields missing from https://mediainfo.js/api (likely unlisted/deprecated)
    [
        "Codec",
        {
            description: "Indicates the standardized name of the format, codec, or container used by the stream.\n\nThis field is deprecated. Use [Format](#field:Format) instead."
        }
    ],
    [
        "Codec_Extensions",
        {
            description: "Lists the common file name extensions associated with the identified codec or container, separated by spaces.\n\nThis field is deprecated. Use [Format Extensions](#field:Format_Extensions) instead."
        }
    ],
    [
        "Codec_Info",
        {
            description: "Provides additional descriptive details or background information about the identified codec or container.\n\nThis field is deprecated. Use [Format Info](#field:Format_Info) instead."
        }
    ],
    [
        "Codec_Settings",
        {
            description: "Specifies advanced or non-default parameter settings used by the codec.\n\nThis field is deprecated. Use [Format Settings](#field:Format_Settings) instead."
        }
    ],
    [
        "Codec_Settings_Automatic",
        {
            description: "Indicates whether the encoder automatically selected the [Codec Settings](#field:Codec_Settings) rather than using manual overrides.\n\nThis field is deprecated."
        }
    ],
    [
        "Codec_String",
        {
            description: "Displays [Codec](#field:Codec) as a human-readable string.\n\nThis field is deprecated. Use [Format String](#field:Format_String) instead."
        }
    ],
    [
        "Codec_Url",
        {
            displayName: "Codec URL",
            description: "Provides a reference URL containing official specifications or documentation for the codec.\n\nThis field is deprecated. Use [Format URL](#field:Format_Url) instead."
        }
    ],
    [
        "Movie_Country",
        {
            description: "Indicates the country of origin or production for the [Movie](#field:Movie)."
        }
    ],
    //TODO: Add more
]);