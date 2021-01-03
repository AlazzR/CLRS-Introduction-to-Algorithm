cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED true)

project(Chapter_9_Sorting)

add_executable(InsertionSort src/main_insert.cpp)
add_executable(MergeSort src/main_merge.cpp)

