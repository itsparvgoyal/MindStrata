// NestedView.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineDown } from 'react-icons/ai'
import api from '../../services/service'
import toast from 'react-hot-toast'
import { deleteSection } from '../../redux/slices/sectionSlice'
import ConfirmModal from '../common/ConfirmModal'
import SubSectionModal from './subSectionModal'
import {replaceSection} from '../../redux/slices/sectionSlice'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";

const NestedView = ({
  setIsUpdating,
  setEditingSectionId,
  setValue,
}) => {

  const [expandedSections, setExpandedSections] = useState(new Set())
  const [modalData, setModalData] = useState(null)

  const [showSubSectionModal, setShowSubSectionModal] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState(null)

  const dispatch = useDispatch()
  const { section } = useSelector((state) => state.rootReducer.section)
  const { course } = useSelector((state) => state.rootReducer.course)

  const [editingSubSection, setEditingSubSection] = useState(null);
  const [isEditingSubSection, setIsEditingSubSection] = useState(false);

  const [openDescription, setOpenDescription] = useState(null);


  const openSubSectionModal = (sectionId) => {
    setCurrentSectionId(sectionId)
    setShowSubSectionModal(true)
  }

  const handleDropdown = (sectionId) => {
    const newExpandedSections = new Set(expandedSections)

    if (newExpandedSections.has(sectionId)) {
      newExpandedSections.delete(sectionId)
    } else {
      newExpandedSections.add(sectionId)
    }

    setExpandedSections(newExpandedSections)
  }

  const handleEditSection = (sectionId) => {
    const sectionData = section.find(
      (sec) => sec._id === sectionId
    )

    setIsUpdating(true)
    setEditingSectionId(sectionId)

    setValue(
      'sectionName',
      sectionData.sectionName
    )
  }

  const handleDeleteSection = (sectionId) => {

    setModalData({
      text1: 'Delete Section',
      text2: 'Are you sure you want to delete this section?',
      btn1Text: 'Delete',
      btn2Text: 'Cancel',

      btn1Handler: () =>
        deleteSectionApi(sectionId),

      btn2Handler: () =>
        setModalData(null),
    })
  }

  const deleteSectionApi = async (id) => {

    try {

      const data = {
        sectionId: id,
        courseId: course._id,
      }

      const res = await api.delete(
        '/course/deleteSection',
        { data }
      )

      if (res.status === 200) {

        dispatch(deleteSection(id))

        toast.success(
          'Section deleted successfully'
        )

        setModalData(null)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const handleDeleteSubSection = (subId , sectionId) => {
    // console.log(subId , sectionId);
    setModalData({
      text1: 'Delete Sub Section',
      text2: 'Are you sure you want to delete this sub section?',
      btn1Text: 'Delete',
      btn2Text: 'Cancel',

      btn1Handler: () =>
        deleteSubSectionApi(subId , sectionId),

      btn2Handler: () =>
        setModalData(null),
    })
  }

  const deleteSubSectionApi = async (subId , sectionId) => {
    try {

      const data = {
        subSectionId: subId,
        sectionId: sectionId,
      }

      const res = await api.delete(
        '/course/deleteSubSection',
        { data },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (res.status === 200) {
        toast.success('Sub Section deleted successfully');
        setShowSubSectionModal(null);
        setModalData(null);
        dispatch(replaceSection(res.data.response))
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
  const handleEditSubSection = (subId , sectionId) => {
    const sectionData = section.find(
      (section) => section._id === sectionId
    )
    const subSectionData = sectionData.subsection.find(
      (sub) => sub._id === subId
    )

    setEditingSubSection(subSectionData);
    setShowSubSectionModal(true);
    setIsEditingSubSection(true);
    setCurrentSectionId(sectionId);
  }

  return (
    <div className="bg-[#121217] border border-[#22222a] p-6 rounded-2xl shadow-xl mt-6">
      {
        section.map((section) => (
          <div key={section._id} className="bg-[#16161a] border border-[#242430] p-4 rounded-xl mb-3 hover:border-gray-700 transition-all duration-200">
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <p className="text-white font-bold text-sm tracking-tight">
                {section.sectionName}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-white bg-[#181820] hover:bg-[#20202a] border border-[#2a2a34] hover:border-gray-500 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    handleEditSection(section._id)
                  }
                  title="Edit Section Name"
                >
                  <AiOutlineEdit size={16} />
                </button>

                <button
                  type="button"
                  className="text-gray-400 hover:text-red-400 bg-[#181820] hover:bg-red-500/10 border border-[#2a2a34] hover:border-red-500/25 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    handleDeleteSection(section._id)
                  }
                  title="Delete Section"
                >
                  <AiOutlineDelete size={16} />
                </button>

                <button
                  type="button"
                  className="text-gray-400 hover:text-white bg-[#181820] hover:bg-[#20202a] border border-[#2a2a34] hover:border-gray-500 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    handleDropdown(section._id)
                  }
                  title="Toggle Lectures"
                >
                  <AiOutlineDown size={16} />
                </button>
              </div>
            </div>

            {
              expandedSections.has(section._id) && (
                <div className="mt-4 border-t border-[#242430] pt-4 flex flex-col gap-4">
                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all cursor-pointer w-fit"
                    onClick={() =>
                      openSubSectionModal(
                        section._id
                      )
                    }
                  >
                    Add Sub Section
                  </button>

                  <div className="flex flex-col gap-3 pl-2 sm:pl-4 border-l-2 border-[#242430]">
                    {
                      section.subsection?.map((sub) => (
                        <div key={sub._id} className="bg-[#0d0d11] border border-[#202028] p-4 rounded-xl hover:border-indigo-500/30 transition-all duration-200">
                          <div className="flex justify-between items-start gap-4 flex-wrap">
                            <div>
                              <p className="text-white font-semibold text-sm">
                                {sub.title}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenDescription(
                                    openDescription === sub._id
                                      ? null
                                      : sub._id
                                  )
                                }
                                className="text-gray-400 hover:text-white bg-[#16161a] border border-[#242430] p-2 rounded-lg transition-all cursor-pointer"
                                title="View Details"
                              >
                                {
                                  openDescription === sub._id
                                    ? <AiOutlineEye size={15} />
                                    : <AiOutlineEyeInvisible size={15} />
                                }
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEditSubSection(
                                    sub._id,
                                    section._id
                                  )
                                }
                                className="text-gray-400 hover:text-white bg-[#16161a] border border-[#242430] hover:border-gray-500 p-2 rounded-lg transition-all cursor-pointer"
                                title="Edit Lecture"
                              >
                                <AiOutlineEdit size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteSubSection(
                                    sub._id,
                                    section._id
                                  )
                                }
                                className="text-gray-400 hover:text-red-400 bg-[#16161a] border border-[#242430] hover:border-red-500/25 p-2 rounded-lg transition-all cursor-pointer"
                                title="Delete Lecture"
                              >
                                <AiOutlineDelete size={15} />
                              </button>
                            </div>
                          </div>

                          {
                            openDescription === sub._id && (
                              <div className="mt-3 border-t border-[#202028] pt-3 text-xs text-gray-400 flex flex-col gap-1.5 leading-relaxed">
                                <p>
                                  <span className="font-semibold text-gray-300">Description:</span> {sub.description}
                                </p>
                                <p>
                                  <span className="font-semibold text-gray-300">Duration:</span> {sub.timeDuration}
                                </p>
                                <p>
                                  <span className="font-semibold text-gray-300">Video File:</span>{" "}
                                  <span className="font-mono text-[10px] bg-[#16161a] px-2 py-0.5 rounded border border-[#242430] inline-block">
                                    {sub.videoUrl ? sub.videoUrl.split("/").pop() : "No Video"}
                                  </span>
                                </p>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </div>
        ))
      }

      {
        showSubSectionModal && (
          <SubSectionModal
            sectionId={currentSectionId}
            setShowSubSectionModal={
              setShowSubSectionModal
            }
            isEditingSubSection={isEditingSubSection}
            editingSubSection={editingSubSection}
            setIsEditingSubSection={setIsEditingSubSection}
          />
        )
      }

      {
        modalData && (
          <ConfirmModal
            modalData={modalData}
          />
        )
      }

    </div>
  )
}

export default NestedView