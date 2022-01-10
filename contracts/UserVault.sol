//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract UserVault {
    struct File {
        address owner;
        string name;
        string uid;
        string file_type;
        string size;
    }

    struct Password {
        string hash;
        string url;
        string username;
    }

    struct Image {
        string name;
        string image_type;
    }

    mapping(address => File[]) private files;
    mapping(string => Password) private passwords;
    mapping(string => Image) private images;

    function getFiles() public view returns (File[] memory) {
        return files[msg.sender];
    }

    //Password CRUD
    function createPassword(
        string memory uid,
        string memory hash,
        string memory url,
        string memory username,
        string memory size
    ) external payable {
        //creating new password object
        Password storage password = passwords[uid];
        password.hash = hash;
        password.url = url;
        password.username = username;

        //creating new file object
        File memory file;
        file.owner = msg.sender;
        file.name = url;
        file.uid = uid;
        file.file_type = "password";
        file.size = size;

        //pushing the new file to user db
        files[msg.sender].push(file);
    }

    function editPassword(
        string memory uid,
        string memory hash,
        string memory url,
        string memory username,
        string memory size
    ) external payable {
        //editing password object
        Password storage password = passwords[uid];
        password.hash = hash;
        password.url = url;
        password.username = username;

        //editing file object
        uint256 index = 0;
        for (uint256 i = 0; i < files[msg.sender].length; i++) {
            if (
                keccak256(bytes(files[msg.sender][i].uid)) ==
                keccak256(bytes(uid))
            ) {
                index = i;
            }
        }

        files[msg.sender][index].name = url;
        files[msg.sender][index].size = size;
    }

    function getPassword(string memory uid)
        public
        view
        returns (Password memory)
    {
        return passwords[uid];
    }

    function deletePassword(string memory uid) external payable {
        uint256 index = 0;
        for (uint256 i = 0; i < files[msg.sender].length; i++) {
            if (
                keccak256(bytes(files[msg.sender][i].uid)) ==
                keccak256(bytes(uid))
            ) {
                index = i;
            }
        }
        delete files[msg.sender][index];
        Password memory password;
        passwords[uid] = password;
    }

    //Image CRUD
    function createImage(
        string memory uid,
        string memory name,
        string memory image_type,
        string memory size
    ) external payable {
        //creating new image object
        Image storage image = images[uid];
        image.name = name;
        image.image_type = image_type;

        //creating new file object
        File memory file;
        file.owner = msg.sender;
        file.name = name;
        file.uid = uid;
        file.file_type = "image";
        file.size = size;

        //pushing the new file to user db
        files[msg.sender].push(file);
    }

    function getImage(string memory uid) public view returns (Image memory) {
        return images[uid];
    }

    function deleteImage(string memory uid) external payable {
        uint256 index = 0;
        for (uint256 i = 0; i < files[msg.sender].length; i++) {
            if (
                keccak256(bytes(files[msg.sender][i].uid)) ==
                keccak256(bytes(uid))
            ) {
                index = i;
            }
        }
        delete files[msg.sender][index];
        Image memory image;
        images[uid] = image;
    }
}
