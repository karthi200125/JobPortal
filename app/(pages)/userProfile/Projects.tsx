'use client';

import Button from "@/components/Button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { GoPlus } from "react-icons/go";
import ProjectCard from "./ProjectCard";
import Model from "@/components/Model/Model";
import { UserProjectForm } from "@/app/Forms/UserProjectForm";
import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "@/actions/user/getUserProjects";
import CarouselSkeleton from "@/Skeletons/CarouselSkeleton";
import { useSelector } from "react-redux";

interface ProjectsProps {
    userId?: any;
    profileUser?: any;
}

export default function Projects({ userId, profileUser }: ProjectsProps) {
    const user = useSelector((state: any) => state.user?.user)
    const { data, isLoading } = useQuery({
        queryKey: ['getUserProjects', userId],
        queryFn: () => getUserProjects(userId),
    });

    const projects = data?.data || [];
    const isCurrentUser = user?.id === profileUser?.id

    return (
        <div className="relative rounded-[20px] border p-5 space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-bold">Projects</h3>
                {isCurrentUser &&
                    <Model
                        bodyContent={<UserProjectForm />}
                        title="Add Project"
                        desc="Add your project details"
                        className="w-[800px]"
                    >
                        <Button variant="border" icon={<GoPlus size={20} />}>Add</Button>
                    </Model>
                }
            </div>
            {isLoading ? (
                <CarouselSkeleton />
            ) : (
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full md:w-[92%] mx-auto"
                >
                    <CarouselContent className="w-full gap-5 md:px-5">
                        {projects?.length > 0 ? (
                            projects?.map((project) => (
                                <CarouselItem key={project?.id} className="md:basis-1/2 lg:basis-1/3">
                                    <ProjectCard project={project} />
                                </CarouselItem>
                            ))
                        ) : (
                            // <div>No Projects Yet</div>
                            ""
                        )}
                    </CarouselContent>
                    {projects?.length >= 3 &&
                        <>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </>
                    }
                </Carousel>
            )}
        </div>
    );
}
