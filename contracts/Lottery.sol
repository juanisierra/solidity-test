pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;


    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(sha3(block.difficulty, now, players)); // Pseudo random value based on block difficulty, time and player addresses
    }

    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0); // Resets the players to a new empty address array
    }

    modifier restricted() { // Can be added to functions
        require(msg.sender == manager);
        _; // Here executes the original function
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
