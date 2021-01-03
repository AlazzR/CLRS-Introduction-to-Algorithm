cmake_minimum_required(VERSION "3.16.3")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_BUILD_TYPE Debug)

project("AVLTree-project")

file(GLOB sources "src/*.cpp" "src/*.hpp")

add_executable(${PROJECT_NAME} ${sources})