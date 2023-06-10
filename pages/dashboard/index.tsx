import { GetServerSidePropsContext } from "next";
import React from "react";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Dashboard() {
  return( <>
<div className="bg-gray-50 dark:bg-gray-800">
    <div className="flex overflow-hidden pt-16 bg-gray-50 dark:bg-gray-900">

        <aside id="sidebar" className="flex hidden fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-75 lg:flex transition-width" aria-label="Sidebar">
            <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex overflow-y-auto flex-col flex-1 pt-5 pb-4">
                <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  <ul className="pb-2 space-y-2">
                    <li>
                      <form action="#" method="GET" className="lg:hidden">
                        <label htmlFor="mobile-search" className="sr-only">Search</label>
                        <div className="relative">
                          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                          </div>
                          <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search"/>
                        </div>
                      </form>
                    </li>
                    <li>
                      <a href="./index.html" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                          <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                          <span className="ml-3" sidebar-toggle-item>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="./kanban.html" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                          <span className="flex-1 ml-3 whitespace-nowrap" sidebar-toggle-item>Kanban</span>
                      </a>
                    </li>
                    <li>
                      <a href="./mailing/inbox.html" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          <span className="flex-1 ml-3 whitespace-nowrap" sidebar-toggle-item>Inbox</span>
                          <span className="inline-flex justify-center items-center p-1 ml-3 w-5 h-5 text-sm font-medium rounded-full text-primary-800 bg-primary-100" sidebar-toggle-item>3</span>
                      </a>
                    </li>
                    
                    <li>
                      <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-ecommerce" data-collapse-toggle="dropdown-ecommerce">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                          <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>E-commerce</span>
                          <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>
                      <ul id="dropdown-ecommerce" className="hidden py-2 space-y-2 ">
                        <li>
                          <a href="./e-commerce/products.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Products</a>
                        </li>
                        <li>
                          <a href="./e-commerce/billing.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Billing</a>
                        </li>
                        <li>
                          <a href="./e-commerce/invoice.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Invoice</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-users" data-collapse-toggle="dropdown-users">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                          <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Users</span>
                          <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>
                      <ul id="dropdown-users" className="hidden py-2 space-y-2 ">
                        <li>
                          <a href="./users/list.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Users list</a>
                        </li>
                        <li>
                          <a href="./users/profile.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Profile</a>
                        </li>
                        <li>
                          <a href="./users/feed.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Feed</a>
                        </li>
                        <li>
                          <a href="./users/settings.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ">Settings</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd"></path></svg>
                          <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Pages</span>
                          <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>
                      <ul id="dropdown-pages" className="hidden py-2 space-y-2">
                        <li>
                          <a href="./pages/pricing.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Pricing</a>
                        </li>
                        <li>
                          <a href="./pages/maintenance.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Maintenance</a>
                        </li>
                        <li>
                          <a href="./pages/404.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">404 not found</a>
                        </li>
                        <li>
                          <a href="./pages/500.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">500 server error</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-auth" data-collapse-toggle="dropdown-auth">
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                          <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Authentication</span>
                          <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>
                      <ul id="dropdown-auth" className="hidden py-2 space-y-2">
                        <li>
                          <a href="./authentication/sign-in.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Sign in</a>
                        </li>
                        <li>
                          <a href="./authentication/sign-up.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Sign up</a>
                        </li>
                        <li>
                          <a href="./authentication/forgot-password.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Forgot password</a>
                        </li>
                        <li>
                          <a href="./authentication/reset-password.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Reset password</a>
                        </li>
                        <li>
                          <a href="./authentication/profile-lock.html" className="flex items-center p-2 pl-11 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Profile lock</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="pt-2 space-y-2">
                    <a href="https://flowbite.com/docs/getting-started/introduction/" target="_blank" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                      <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                      <span className="ml-3" sidebar-toggle-item>Docs</span>
                    </a>
                    <a href="https://flowbite.com/docs/components/alerts/" target="_blank" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                      <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                      <span className="ml-3" sidebar-toggle-item>Components</span>
                    </a>
                    <a href="https://github.com/themesberg/flowbite/issues" target="_blank" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                      <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                      <span className="ml-3" sidebar-toggle-item>Help</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex" sidebar-bottom-menu>
                <a href="#" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                </a>
                <a href="../../users/settings/" data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                </a>
                <div id="tooltip-settings" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                  Settings page
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button" data-dropdown-toggle="language-dropdown" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="h-5 w-5 rounded-full mt-0.5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g></svg>
                </button>
                
                <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" id="language-dropdown">
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div className="inline-flex items-center">
                          <svg className="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512">
                            <g fill-rule="evenodd">
                              <g stroke-width="1pt">
                                <path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/>
                                <path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/>
                              </g>
                              <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/>
                              <path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z" transform="scale(3.9385)"/>
                            </g>
                          </svg>              
                          English (US)
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div className="inline-flex items-center">
                          <svg className="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512">
                            <path fill="#ffce00" d="M0 341.3h512V512H0z"/>
                            <path d="M0 0h512v170.7H0z"/>
                            <path fill="#d00" d="M0 170.7h512v170.6H0z"/>
                          </svg>
                          Deutsch
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div className="inline-flex items-center">
                          <svg className="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512">
                            <g fill-rule="evenodd" stroke-width="1pt">
                              <path fill="#fff" d="M0 0h512v512H0z"/>
                              <path fill="#009246" d="M0 0h170.7v512H0z"/>
                              <path fill="#ce2b37" d="M341.3 0H512v512H341.3z"/>
                            </g>
                          </svg>              
                          Italiano
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div className="inline-flex items-center">
                          <svg className="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512">
                            <defs>
                              <path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"/>
                            </defs>
                            <use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkHref="#a"/>
                            <use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlinkHref="#a"/>
                            <use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkHref="#a"/>
                            <use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkHref="#a"/>
                          </svg>
                          中文 (繁體)
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </aside>

        <div className="hidden fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
        <div id="main-content" className="overflow-y-auto relative w-full h-full bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main>

                <div className="px-4 pt-6">
                    <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex-shrink-0">
                                <span
                                    className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">$45,385</span>
                                <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</h3>
                            </div>
                            <div
                                className="flex flex-1 justify-end items-center text-base font-bold text-green-500 dark:text-green-400">
                                12.5%
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div id="main-chart"></div>
                      {/* Card Footer  */}
                        <div
                            className="flex justify-between items-center pt-3 mt-5 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                            <div>
                                <button
                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    type="button" data-dropdown-toggle="weekly-sales-dropdown">Last 7 days <svg
                                        className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg></button>
                             {/* Dropdown menu  */}
                                <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="weekly-sales-dropdown">
                                    <div className="py-3 px-4" role="none">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                            role="none">
                                            Sep 16, 2021 - Sep 22, 2021
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Yesterday</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Today</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 7 days</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 30 days</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 90 days</a>
                                        </li>
                                    </ul>
                                    <div className="py-1" role="none">
                                        <a href="#"
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem">Custom...</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#"
                                    className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                                    Sales Report
                                    <svg className="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-2 xl:grid-cols-3">
                        <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span
                                        className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">2,340</span>
                                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">New products this
                                        week</h3>
                                </div>
                                <div
                                    className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500 dark:text-green-400">
                                    14.6%
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div id="new-products-chart"></div>
                           {/* Card Footer  */}
                            <div
                                className="flex justify-between items-center pt-3 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                                <div>
                                    <button
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        type="button" data-dropdown-toggle="new-products-dropdown">Last 7 days <svg
                                            className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg></button>
                                  {/* Dropdown menu  */}
                                    <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="new-products-dropdown">
                                        <div className="py-3 px-4" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                                role="none">
                                                Sep 16, 2021 - Sep 22, 2021
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                                        Products Report
                                        <svg className="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span
                                        className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">5,355</span>
                                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">Visitors this
                                        week</h3>
                                </div>
                                <div
                                    className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500 dark:text-green-400">
                                    32.9%
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div id="visitors-chart"></div>
                          {/* Card Footer  */}
                            <div
                                className="flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-6 mt-3.5 dark:border-gray-700">
                                <div>
                                    <button
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        type="button" data-dropdown-toggle="visitors-dropdown">Last 7 days <svg
                                            className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg></button>
                                   {/* Dropdown menu  */}
                                    <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="visitors-dropdown">
                                        <div className="py-3 px-4" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                                role="none">
                                                Sep 16, 2021 - Sep 22, 2021
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                                        Visits Report
                                        <svg className="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span
                                        className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">385</span>
                                    <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">User signups this
                                        week</h3>
                                </div>
                                <div
                                    className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-red-500 dark:text-red-400">
                                    -2.7%
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div id="week-signups-chart"></div>
                       {/* Card Footer  */}
                            <div
                                className="flex justify-between items-center pt-3 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                                <div>
                                    <button
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                        type="button" data-dropdown-toggle="week-signups-dropdown">Last 7 days <svg
                                            className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg></button>
                                  {/* Dropdown menu */}
                                    <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="week-signups-dropdown">
                                        <div className="py-3 px-4" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                                role="none">
                                                Sep 16, 2021 - Sep 22, 2021
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#"
                                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                                        Users Report
                                        <svg className="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                       {/* Card Title */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Transactions</h3>
                                <span className="text-base font-normal text-gray-500 dark:text-gray-400">This is a list of
                                    latest transactions</span>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#"
                                    className="p-2 text-sm font-medium rounded-lg text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">View
                                    all</a>
                            </div>
                        </div>
                       {/* Table  */}
                        <div className="flex flex-col mt-8">
                            <div className="overflow-x-auto rounded-lg">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden shadow sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                        Transaction
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                        Date & Time
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                        Amount
                                                    </th>
                                                    <th scope="col"
                                                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800">
                                                <tr>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Bonnie Green</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 23 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $2300
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment refund to <span className="font-semibold">#00910</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 23 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        -$670
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment failed from <span className="font-semibold">#087651</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 18 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $234
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-red-100 dark:bg-red-200 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Cancelled</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Lana Byrd</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 15 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $5000
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-purple-100 dark:bg-purple-200 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">In
                                                            progress</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Jese Leos</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 15 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $2300
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">THEMESBERG LLC</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 11 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $560
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Lana Lysle</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 6 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $1437
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment to <span className="font-semibold">Joseph Mcfall</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Apr 1 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $980
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Alphabet LLC</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Mar 23 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $11,436
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-purple-100 dark:bg-purple-200 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">In
                                                            progress</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        Payment from <span className="font-semibold">Bonnie Green</span>
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        Mar 23 ,2021
                                                    </td>
                                                    <td
                                                        className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                        $560
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <span
                                                            className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Completed</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                       {/* Card Footer  */}
                        <div className="flex justify-between items-center pt-3 sm:pt-6">
                            <div>
                                <button
                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    type="button" data-dropdown-toggle="transactions-dropdown">Last 7 days <svg
                                        className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg></button>
                              {/* Dropdown menu  */}
                                <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="transactions-dropdown">
                                    <div className="py-3 px-4" role="none">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                            role="none">
                                            Sep 16, 2021 - Sep 22, 2021
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Yesterday</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Today</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 7 days</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 30 days</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem">Last 90 days</a>
                                        </li>
                                    </ul>
                                    <div className="py-1" role="none">
                                        <a href="#"
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem">Custom...</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#"
                                    className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                                    Transactions Report
                                    <svg className="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer
                className="p-4 my-6 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8 dark:bg-gray-800">
                <ul className="flex flex-wrap items-center mb-6 space-y-1 md:mb-0">
                    <li><a href="#"
                            className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Terms
                            and conditions</a></li>
                    <li><a href="#"
                            className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy
                            Policy</a></li>
                    <li><a href="#"
                            className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</a>
                    </li>
                    <li><a href="#"
                            className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Cookie
                            Policy</a></li>
                    <li><a href="#"
                            className="text-sm font-normal text-gray-500 hover:underline dark:text-gray-400">Contact</a>
                    </li>
                </ul>
                <div className="flex space-x-6 sm:justify-center">
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </footer>
            <p className="my-10 text-sm text-center text-gray-500">
                &copy; 2019-2022 <a href="https://flowbite.com/" className="hover:underline"
                    target="_blank">Flowbite.com</a>. All rights reserved.
            </p>
        </div>
    </div>
 
</div>
  </>);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
};