import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from '@/assets/images/logo-white.png';
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
    RouteBlog,
    RouteBlogByCategory,
    RouteCategoryDetails,
    RouteCommentDetails,
    RouteIndex,
    RouteUser
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user);
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    });

    return (
        <Sidebar>
            <SidebarHeader className="bg-white">
                <img src={logo} width={120} />
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarMenu>

                        <SidebarMenuItem>
                            <Link to={RouteIndex}>
                                <SidebarMenuButton>
                                    <IoHomeOutline />
                                    Home
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem>
                                    <Link to={RouteBlog}>
                                        <SidebarMenuButton>
                                            <GrBlog />
                                            Blogs
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <Link to={RouteCommentDetails}>
                                        <SidebarMenuButton>
                                            <FaRegComments />
                                            Comments
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                        )}

                        {user && user.isLoggedIn && user.user.role === 'admin' && (
                            <>
                                <SidebarMenuItem>
                                    <Link to={RouteCategoryDetails}>
                                        <SidebarMenuButton>
                                            <BiCategoryAlt />
                                            Categories
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <Link to={RouteUser}>
                                        <SidebarMenuButton>
                                            <LuUsers />
                                            Users
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                        )}

                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData?.category?.length > 0 &&
                            categoryData.category.map(category => (
                                <SidebarMenuItem key={category._id}>
                                    <Link to={RouteBlogByCategory(category.slug)}>
                                        <SidebarMenuButton>
                                            <GoDot />
                                            {category.name}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
