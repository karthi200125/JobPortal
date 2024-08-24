import DeleteProjectForm from '@/app/Forms/DeleteProjectForm';
import { UserProjectForm } from '@/app/Forms/UserProjectForm';
import Icon from '@/components/Icon';
import Model from '@/components/Model/Model';
import Image from 'next/image';
import { CiTrash } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";

const ProjectCard = ({ project }: any) => {
    return (
        <div className='border rounded-[20px] p-5 space-y-5 max-h-max hover:bg-neutral-50 cursor-pointer trans bg-white'>
            <Image src={''} alt="" width={10} height={10} className="w-full h-[150px] bg-neutral-200 rounded-[20px]" />
            <div className="space-y-1">
                <h4 className="font-bold">{project?.proName}</h4>
                <h6 className="text-[var(--lighttext)]">{project?.proLink}</h6>
                <h5>{project?.proDesc}</h5>
                <div className="flex flex-row items-center gap-5 justify-end">
                    <Model
                        bodyContent={<UserProjectForm isEdit project={project} />}
                        title='Edit Project'
                        desc='edit your project Details'
                        className='w-[800px]'
                    >
                        <Icon icon={<LuPencil size={20} />} isHover title='Edit Project' />
                    </Model>
                    <Model
                        bodyContent={<DeleteProjectForm project={project} />}
                        title='Delete Project'
                        desc='Delete your project'
                        className='w-[400px]'
                    >
                        <Icon icon={<CiTrash size={20} />} isHover title='Delete Project' />
                    </Model>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard