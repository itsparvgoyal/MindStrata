import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../../services/service'
import { replaceSection } from '../../redux/slices/sectionSlice'
import { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import Loader from '../common/Loader'
import { setLoading } from '../../redux/slices/courseSlice'

const SubSectionModal = ({
  sectionId,
  setShowSubSectionModal,
  isEditingSubSection,
  editingSubSection,
  setIsEditingSubSection
}) => {

  const dispatch = useDispatch();
  const [videoPreview, setVideoPreview] = useState(null);
  const isLoading = useSelector((state) => state.rootReducer.course.loading);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
      defaultValues: {
      title: "",
      description: "",
      video: "",
    },
  })

  useEffect(() => {
    return () => {
      if (
        videoPreview &&
        videoPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  useEffect(() => {
  if (isEditingSubSection) {
    setValue("title", editingSubSection.title);
    setValue("description", editingSubSection.description);

    if (editingSubSection.videoUrl) {
      setVideoPreview(editingSubSection.videoUrl);
    }
  }
  }, [isEditingSubSection, editingSubSection , setValue]);

  const submitHandler = async (data) => {
    dispatch(setLoading(true));

    try {
      const formData = new FormData();

      formData.append("sectionId", sectionId);
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (isEditingSubSection) {
        formData.append(
          "subSectionId",
          editingSubSection._id
        );

        if (data.video?.[0]) {
          formData.append(
            "video",
            data.video[0]
          );
        }

        const response = await api.put(
          "/course/updateSubSection",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            replaceSection(
              response.data.response
            )
          );

          toast.success(
            "Lecture Updated Successfully"
          );

          reset();
          setVideoPreview(null);
          setShowSubSectionModal(false);
          setIsEditingSubSection(false);
        }
      } else {
        if (!data.video?.[0]) {
          toast.error(
            "Please upload a video"
          );
          return;
        }

        formData.append(
          "video",
          data.video[0]
        );

        const response = await api.post(
          "/course/createSubSection",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            replaceSection(
              response.data.response
            )
          );

          toast.success(
            "Lecture Added Successfully"
          );

          reset();
          setVideoPreview(null);
          setShowSubSectionModal(false);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        isEditingSubSection
          ? "Failed to update lecture"
          : "Failed to create lecture"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    isLoading ? (
      <Loader/>
    ) : (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm select-none">

      <div className="bg-[#121217] border border-[#22222a] text-white p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-6">

        <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center justify-between border-b border-[#22222a] pb-4">
          {isEditingSubSection ? 'Edit Lecture' : 'Add Lecture'}     
          <CiCirclePlus size={28} className="text-indigo-400" />
        </h2>

        <form
          onSubmit={handleSubmit(
            submitHandler
          )}
          className="flex flex-col gap-5"
        >

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
              Lecture Title
            </label>

            <input
              type="text"
              placeholder="Enter lecture title"
              className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              {...register('title', {
                required:
                  'Title is required',
              })}
            />

            {
              errors.title && (
                <p className="text-xs text-red-500 font-medium">
                  {
                    errors.title
                      .message
                  }
                </p>
              )
            }
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
              Description
            </label>

            <textarea
              placeholder="Enter detailed description of the lecture"
              className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors min-h-[100px] resize-y"
              {...register(
                'description',
                {
                  required:
                    'Description is required',
                }
              )}
            />

            {
              errors.description && (
                <p className="text-xs text-red-500 font-medium">
                  {
                    errors
                      .description
                      .message
                  }
                </p>
              )
            }
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
              Lecture Video
            </label>

            {
              videoPreview ? (
                <div className="space-y-4">
                  <div className="w-full rounded-2xl border border-[#22222a] overflow-hidden bg-black shadow-lg">
                    <video
                      key={videoPreview}
                      controls
                      className="w-full h-auto aspect-video block"
                    >
                      <source src={videoPreview} />
                    </video>
                  </div>

                  <label
                    htmlFor="videoUpload"
                    className="inline-block cursor-pointer bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2 px-4 rounded-xl text-xs transition-all duration-200"
                  >
                    Change Video File
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="videoUpload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#242430] hover:border-indigo-500/50 bg-[#16161a]/40 hover:bg-[#16161a]/85 transition-all p-8 text-center"
                >
                  <p className="text-indigo-400 font-bold text-sm">
                    Upload Lecture Video
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    Click to select lecture video (MP4, WebM format)
                  </p>
                </label>
              )
            }

            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="hidden"
              {...register('video', {
                required: (!isEditingSubSection || !videoPreview)
                  ? 'Video is required'
                  : false,

                onChange: (e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setVideoPreview(
                      URL.createObjectURL(file)
                    );
                  }
                },
              })}
            />

            {
              errors.video && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.video.message}
                </p>
              )
            }
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t border-[#22222a] mt-4">
            <button
              type="button"
              onClick={() => {
               setShowSubSectionModal(false);
               setIsEditingSubSection(false);

               reset({
                  title: "",
                 description: "",
                 video: "",
               });

               setVideoPreview(null);
              }}
              className="bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-gray-950 font-bold py-2.5 px-6 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm disabled:opacity-40"
            >
              Save Lecture
            </button>
          </div>

        </form>

      </div>

       </div>
    )
    )
}

export default SubSectionModal