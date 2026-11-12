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
            description: "Indicates the gain adjustment (in dB) needed to normalize the perceived loudness of the entire album to the ReplayGain reference level of 89 dB SPL (Sound Pressure Level), while preserving relative volume differences between its tracks.\n\nReplayGain is an audio normalization standard that prevents having to manually adjust volume when playing tracks or albums mastered at different loudness levels."
        }
    ],
    [
        "Album_ReplayGain_Gain_String",
        {
            description: "Indicates the gain adjustment (in dB) needed to normalize the perceived loudness of the entire album to the ReplayGain reference level of 89 dB SPL (Sound Pressure Level), while preserving relative volume differences between its tracks.\n\nReplayGain is an audio normalization standard that prevents having to manually adjust volume when playing tracks or albums mastered at different loudness levels.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "Album_ReplayGain_Peak",
        {
            description: "Indicates the maximum sample amplitude across all tracks in the album, represented on a normalized scale where 1.0 corresponds to digital full scale (0 dBFS).\n\nMedia players use this peak value alongside \"Album ReplayGain Gain\" to prevent audio clipping when applying positive gain adjustments during playback."
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
            description: "Indicates the total number of audio streams (or tracks) contained within the media file.\n\nThis is distinct from \"Total Audio Channels\", which counts individual audio channels (such as stereo or 5.1) rather than separate streams."
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
            description: "A list of all audio codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Audio Format List\" instead.",
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
            description: "Indicates the raw, container-specific identifier used to specify the format or codec of the file or stream.\n\nUnlike \"Format\", which provides a standardized name, this value reflects the exact tag stored in the container header."
        }
    ],
    [
        "CodecID_Compatible",
        {
            description: "A list of all codecs that are compatible with the identified container."
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
            description: "Provides additional descriptive information or the full specification name associated with the \"Codec ID\"."
        }
    ],
    [
        "CodecID_String",
        {
            description: "Indicates the raw, container-specific identifier used to specify the format or codec of the file or stream.\n\nUnlike \"Format\", which provides a standardized name, this value reflects the exact tag stored in the container header.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "CodecID_Url",
        {
            displayName: "Codec ID URL",
            description: "Provides a reference URL with additional details or specifications associated with the \"Codec ID\"."
        }
    ],
    [
        "CodecID_Version",
        {
            description: "Specifies the version of the \"Codec ID\"."
        }
    ],
    [
        "CompleteName",
        {
            description: "Indicates the full path of the file, including the directory path, file name, and extension."
        } //TODO: Add link to "File Path" under media/
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
            description: "Indicates the total number of internal parameter slots allocated for this stream, including empty fields that are omitted from the output."
        }
    ],
    [
        "DataSize",
        {
            description: "Indicates the size (in bytes) of the raw media data payload within the file, excluding container headers and footers.\n\nTypically, the total \"File Size\" equals the sum of \"Header Size\", \"Data Size\", and \"Footer Size\"."
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
            description: "Indicates whether the timecode used for \"Delay\" uses drop-frame numbering to stay aligned with real-world clock time (common in 29.97 or 59.94 fps NTSC video)."
        }
    ],
    [
        "Delay_Settings",
        {
            description: "Specifies additional parameters that define how \"Delay\" is interpreted, such as timecode frame rate or drop-frame settings."
        }
    ],
    [
        "Delay_Source",
        {
            description: "Indicates the source from which \"Delay\" was extracted, such as the container metadata or a specific stream."
        }
    ],
    [
        "Delay_Source_String",
        {
            description: "Indicates the source from which \"Delay\" was extracted, such as the container metadata or a specific stream.\n\nFormatted as a human-readable string."
        }
    ],
    [
        "Delay_String",
        {
            description: "Displays \"Delay\" as a human-readable string using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 213 ms)."
        }
    ],
    [
        "Delay_String1",
        {
            description: "Displays \"Delay\" using hours, minutes, seconds, and milliseconds with any zero-value units omitted (for example, 1 s 250 ms)."
        }
    ],
    [
        "Delay_String2",
        {
            description: "Displays \"Delay\" using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 213 ms)."
        }
    ],
    [
        "Delay_String3",
        {
            description: "Displays \"Delay\" in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Delay_String4",
        {
            description: "Displays \"Delay\" in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Delay_String5",
        {
            description: "Displays \"Delay\" in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
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
            description: "Displays \"Duration End\" as a human-readable string using up to the two largest non-zero time units (for example, 2 min 6 s), or as a formatted UTC timestamp."
        }
    ],
    [
        "Duration_End_String1",
        {
            description: "Displays \"Duration End\" using hours, minutes, seconds, and milliseconds with zero-value units omitted (for example, 2 min 6 s 584 ms)."
        }
    ],
    [
        "Duration_End_String2",
        {
            description: "Displays \"Duration End\" using up to the two largest non-zero time units (for example, 2 min 6 s)."
        }
    ],
    [
        "Duration_End_String3",
        {
            description: "Displays \"Duration End\" in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Duration_End_String4",
        {
            description: "Displays \"Duration End\" in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_End_String5",
        {
            description: "Displays \"Duration End\" in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
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
            description: "Displays \"Duration Start\" as a human-readable string using up to the two largest non-zero time units (for example, 2 min 6 s), or as a formatted UTC timestamp."
        }
    ],
    [
        "Duration_Start_String1",
        {
            description: "Displays \"Duration Start\" using hours, minutes, seconds, and milliseconds with zero-value units omitted (for example, 2 min 6 s 584 ms)."
        }
    ],
    [
        "Duration_Start_String2",
        {
            description: "Displays \"Duration Start\" using up to the two largest non-zero time units (for example, 2 min 6 s)."
        }
    ],
    [
        "Duration_Start_String3",
        {
            description: "Displays \"Duration Start\" in hours, minutes, seconds, and milliseconds format (HH:MM:SS.mmm)."
        }
    ],
    [
        "Duration_Start_String4",
        {
            description: "Displays \"Duration Start\" in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_Start_String5",
        {
            description: "Displays \"Duration Start\" in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
        }
    ],
    [
        "Duration_String",
        {
            description: "Displays \"Duration\" as a human-readable string using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 1 h 40 min)."
        }
    ],
    [
        "Duration_String1",
        {
            description: "Displays \"Duration\" using hours, minutes, seconds, and milliseconds with any zero-value units omitted (for example, 1 h 40 min 12 s 500 ms)."
        }
    ],
    [
        "Duration_String2",
        {
            description: "Displays \"Duration\" using up to the two largest non-zero time units, with the second unit omitted if zero (for example, 1 h 40 min)."
        }
    ],
    [
        "Duration_String3",
        {
            description: "Displays \"Duration\" in hours, minutes, seconds, and milliseconds format (for example, 01:40:00.000)."
        }
    ],
    [
        "Duration_String4",
        {
            description: "Displays \"Duration\" in timecode format using hours, minutes, seconds, and frames (HH:MM:SS:FF), with the last colon replaced by a semicolon (HH:MM:SS;FF) if drop-frame is available."
        }
    ],
    [
        "Duration_String5",
        {
            description: "Displays \"Duration\" in hours, minutes, seconds, and milliseconds followed by the frame-based timecode in parentheses, formatted as HH:MM:SS.mmm (HH:MM:SS:FF)."
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
            description: "Specifies the method used to apply encryption to the media data."
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
            description: "Indicates the starting index of the Electronic Program Guide (EPG) schedule entries stored in this stream's internal parameter list.\n\nTools use this index alongside \"EPG Positions End\" to locate and iterate through broadcast program listings."
        }
    ],
    [
        "EPG_Positions_End",
        {
            displayName: "EPG Positions End",
            description: "Indicates the ending index (exclusive) of the Electronic Program Guide (EPG) schedule entries stored in this stream's internal parameter list.\n\nSubtracting \"EPG Positions Begin\" from this value gives the total number of broadcast program listings."
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
            description: "Displays \"File Size\" as a human-readable string with its unit of measurement (calculated in powers of 1024)."
        }
    ],
    [
        "FileSize_String1",
        {
            description: "Displays \"File Size\" with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "FileSize_String2",
        {
            description: "Displays \"File Size\" with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "FileSize_String3",
        {
            description: "Displays \"File Size\" with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "FileSize_String4",
        {
            description: "Displays \"File Size\" with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
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
            description: "Indicates the size (in bytes) of the footer data structure located at the end of the file or stream."
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
            description: "Indicates the denominator component of the fractional frame rate value."
        }
    ],
    [
        "FrameRate_Num",
        {
            description: "Indicates the numerator component of the fractional frame rate value."
        }
    ],
    [
        "FrameRate_String",
        {
            description: "Displays the frame rate as a human-readable string with its unit of measurement."
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
            description: "Indicates the size (in bytes) of the header data structure located at the beginning of the file or stream."
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
            description: "Displays the stream identification number as a human-readable string."
        }
    ],
    [
        "Image_Codec_List",
        {
            description: "A list of all image formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Image Format List\" instead."
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
            description: "Indicates the result of the last Inform method call, containing the full formatted text report generated for the stream."
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
            description: "Indicates whether the file is structured to support streaming playback (such as progressive HTTP download or web streaming)."
        }
    ],
    [
        "Menu_Codec_List",
        {
            description: "A list of all menu formats found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Menu Format List\" instead."
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
            description: "Displays the menu identification number as a human-readable string."
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
            description: "Displays the original source medium identification tag as a human-readable string."
        }
    ],
    [
        "Other_Codec_List",
        {
            description: "A list of all auxiliary data formats found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Other Format List\" instead."
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
            description: "Indicates the peak combined bit rate across all streams in the file, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Maximum_String",
        {
            description: "Displays the maximum combined bit rate of all streams as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_Minimum",
        {
            description: "Indicates the lowest combined bit rate across all streams in the file, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Minimum_String",
        {
            description: "Displays the minimum combined bit rate of all streams as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_Mode",
        {
            description: "Indicates the overall bit rate control mode across all streams."
        }
    ],
    [
        "OverallBitRate_Mode_String",
        {
            description: "Displays the overall bit rate mode as a human-readable word."
        }
    ],
    [
        "OverallBitRate_Nominal",
        {
            description: "Indicates the target nominal bit rate for all streams combined, expressed in bits per second (bps)."
        }
    ],
    [
        "OverallBitRate_Nominal_String",
        {
            description: "Displays the nominal combined bit rate as a human-readable string with its unit of measurement."
        }
    ],
    [
        "OverallBitRate_String",
        {
            description: "Displays the combined bit rate of all streams as a human-readable string with its unit of measurement."
        }
    ],
    [
        "PackageName",
        {
            description: "Indicates the package name embedded within the MXF container metadata."
        }
    ],
    [
        "Status",
        {
            description: "Indicates the internal parsing status bit field (such as accepted, filled, updated, or finished)."
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
            description: "Displays the name of the media stream type as a human-readable string."
        }
    ],
    [
        "StreamKindID",
        {
            description: "Indicates the zero-based identification number assigned to the stream in order of parsing."
        }
    ],
    [
        "StreamKindPos",
        {
            displayName: "Stream Kind Position",
            description: "Indicates the one-based position number of the stream when multiple streams of the same kind exist, assigned in order of parsing."
        }
    ],
    [
        "StreamOrder",
        {
            description: "Indicates the zero-based sequential order of the stream within the file for its specific stream type."
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
            description: "Indicates the size of the stream in bytes after being demuxed from the container."
        }
    ],
    [
        "StreamSize_Demuxed_String",
        {
            description: "Displays the demuxed stream size as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_Demuxed_String1",
        {
            description: "Displays the demuxed stream size with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "StreamSize_Demuxed_String2",
        {
            description: "Displays the demuxed stream size with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String3",
        {
            description: "Displays the demuxed stream size with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String4",
        {
            description: "Displays the demuxed stream size with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
        }
    ],
    [
        "StreamSize_Demuxed_String5",
        {
            description: "Displays the demuxed stream size as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_Proportion",
        {
            description: "Indicates the proportion of the total file size occupied by this stream."
        }
    ],
    [
        "StreamSize_String",
        {
            description: "Displays the stream size as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "StreamSize_String1",
        {
            description: "Displays the stream size with its unit of measurement (calculated in powers of 1024), rounded to the nearest integer."
        }
    ],
    [
        "StreamSize_String2",
        {
            description: "Displays the stream size with its unit of measurement (calculated in powers of 1024), rounded to two significant digits."
        }
    ],
    [
        "StreamSize_String3",
        {
            description: "Displays the stream size with its unit of measurement (calculated in powers of 1024), rounded to three significant digits."
        }
    ],
    [
        "StreamSize_String4",
        {
            description: "Displays the stream size with its unit of measurement (calculated in powers of 1024), rounded to four significant digits."
        }
    ],
    [
        "StreamSize_String5",
        {
            description: "Displays the stream size as a human-readable string with its unit of measurement (calculated in powers of 1024) and percentage share."
        }
    ],
    [
        "Text_Codec_List",
        {
            description: "A list of all text formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Text Format List\" instead."
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
            description: "Indicates the Universal Media Identifier (UMID) assigned to uniquely identify the material."
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
            description: "Displays the unique stream identification string as a human-readable value."
        }
    ],
    [
        "UniversalAdID_Registry",
        {
            displayName: "Universal Ad-ID Registry",
            description: "Specifies the registry authority responsible for the Universal Ad-ID associated with the asset."
        }
    ],
    [
        "UniversalAdID_String",
        {
            displayName: "Universal Ad-ID String",
            description: "Displays the Universal Ad-ID as a formatted string."
        }
    ],
    [
        "UniversalAdID_Value",
        {
            displayName: "Universal Ad-ID Value",
            description: "Indicates the unique identification value assigned by the Universal Ad-ID registry for advertising asset tracking."
        }
    ],
    [
        "Video_Codec_List",
        {
            description: "A list of all video formats or codecs found in the file, separated by forward slashes (/).\n\nThis field is deprecated. Use \"Video Format List\" instead."
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
            description: "Indicates the type or genre of the content."
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
            description: "Indicates the Internet Content Rating Association (ICRA) rating, formerly known as RSACi."
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
    //TODO: Add more
]);