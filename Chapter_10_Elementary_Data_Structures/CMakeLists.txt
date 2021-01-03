cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED true)

project(Chapter_3)

add_executable(SLandDL src/ImplementationFromScratch/main.cpp src/ImplementationFromScratch/SLL.cpp src/ImplementationFromScratch/DLL.cpp)




