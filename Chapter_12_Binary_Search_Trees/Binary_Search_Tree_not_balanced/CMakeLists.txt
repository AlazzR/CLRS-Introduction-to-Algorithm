cmake_minimum_required(VERSION "3.16.3")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

project("Augmented_BST")

file(GLOB Sources "src/*.cpp" "src/*.h")

add_executable(${PROJECT_NAME} ${Sources})