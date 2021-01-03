cmake_minimum_required(VERSION "3.16.3")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED true)
set(CMAKE_BUILD_TYPE Debug)

project("Counting-Radix-Sort")

file(GLOB Sources "src/*.cpp" "src/*.hpp")
add_executable(${PROJECT_NAME} ${Sources})
