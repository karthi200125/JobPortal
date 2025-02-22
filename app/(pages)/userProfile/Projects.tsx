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
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/app/Redux/ModalSlice";
import ShowProject from "./ShowProject";
import React from "react";

interface ProjectsProps {
    userId?: any;
    profileUser?: any;
}

export default function Projects({ userId, profileUser }: ProjectsProps) {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()

    const { data, isLoading } = useQuery({
        queryKey: ['getUserProjects', userId],
        queryFn: () => getUserProjects(userId),
    });

    const handleShowProjectClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(openModal('userProjectModal'))
    };

    const projects = data?.data || [];
    const isCurrentUser = user?.id === profileUser?.id;

    return (
        <div className="relative rounded-[20px] border p-5 space-y-5">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-bold">Projects</h3>
                {isCurrentUser && (
                    <Model
                        bodyContent={<UserProjectForm />}
                        modalId="userProjectModal"
                        title="Add Project"
                        desc="Add your project details"
                        className="min-w-[300px] lg:w-[800px]"
                    >
                        <Button variant="border" onClick={handleShowProjectClick} icon={<GoPlus size={20} />}>Add</Button>
                    </Model>
                )}
            </div>

            {/* Carousel */}
            {isLoading ? (
                <CarouselSkeleton />
            ) : (
                <Carousel opts={{ align: "start" }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {projects?.length > 0 && (
                            projects.map((project) => (
                                <CarouselItem key={project?.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Model
                                            bodyContent={<ShowProject project={project} />}
                                            title={project?.proName}
                                            desc=""
                                            className="min-w-[300px] md:w-[600px] lg:w-[1000px]"
                                            modalId="showProjectModal"
                                        >
                                            <ProjectCard
                                                project={project}
                                                onClick={() => dispatch(openModal('showProjectModal'))}
                                                className="h-[320px] w-full"
                                                isCurrentUser={isCurrentUser}
                                            />
                                        </Model>
                                    </div>
                                </CarouselItem>
                            ))
                        )}
                    </CarouselContent>

                    {/* Show navigation only if projects >= 3 */}
                    {projects?.length >= 3 && (
                        <>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </>
                    )}
                </Carousel>
            )}
        </div>
    );
}
