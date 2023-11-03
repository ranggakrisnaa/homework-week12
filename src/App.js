import * as React from "react";
import { Provider } from "react-redux";
import store from "./reducers/configureStore";
import { useSelector, useDispatch } from "react-redux";
import {
  setState,
  setOWin,
  setDraw,
  setXWin,
  setWinner,
  resetState,
  resetWin,
} from "./reducers/tictactoeReducer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

function Board() {
  const squares = useSelector((state) => state.states.squares);
  const xIsNext = useSelector((state) => state.states.xIsNext);
  const winner = useSelector((state) => state.states.winner);

  const dispatch = useDispatch();

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = xIsNext ? "X" : "O";
    dispatch(setState(newSquares));
  }

  function renderSquare(i) {
    return (
      <Button
        width={"36"}
        height={"36"}
        bg={"transparent"}
        onClick={() => selectSquare(i)}
      >
        <Text fontSize={"7xl"}>{squares[i]}</Text>
      </Button>
    );
  }

  const nextValue = calculateNextValue(squares);
  React.useEffect(() => {
    const winner = calculateWinner(squares);
    console.log(winner);
    dispatch(setWinner(winner));
    if (winner === "X") {
      dispatch(setXWin());
    } else if (winner === "O") {
      dispatch(setOWin());
    } else if (winner === "draw") {
      dispatch(setDraw());
    }
  }, [squares, dispatch]);

  const status = calculateStatus(winner, squares, nextValue);
  console.log(status);

  return (
    <Box>
      <Box
        padding={"3.5"}
        display={"inline"}
        rounded={"md"}
        border={"none"}
        boxShadow={"lg"}
        fontSize={"3xl"}
        bg={"lemonchiffon"}
        fontWeight={"semibold"}
        color={"black"}
      >
        {status}
      </Box>
      <Box marginTop={"14"}>
        <Flex>
          <Box border={"4px"} borderTop={0} borderLeft={0}>
            {renderSquare(0)}
          </Box>
          <Box border={"4px"} borderTop={0}>
            {renderSquare(1)}
          </Box>
          <Box border={"4px"} borderTop={0} borderRight={0}>
            {renderSquare(2)}
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <Box border={"4px"} borderLeft={0}>
            {renderSquare(3)}
          </Box>
          <Box border={"4px"}>{renderSquare(4)}</Box>
          <Box border={"4px"} borderRight={0}>
            {renderSquare(5)}
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <Box border={"4px"} borderLeft={0} borderBottom={0}>
            {renderSquare(6)}
          </Box>
          <Box border={"4px"} borderBottom={0}>
            {renderSquare(7)}
          </Box>
          <Box border={"4px"} borderBottom={0} borderRight={0}>
            {renderSquare(8)}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

function Game() {
  const xWin = useSelector((state) => state.states.xWin);
  const oWin = useSelector((state) => state.states.oWin);
  const draw = useSelector((state) => state.states.draw);
  const dispatch = useDispatch();
  return (
    <Box bg={"tomato"}>
      <Text textAlign={"Center"} fontWeight={"semibold"} fontSize={"6xl"}>
        Tic-Tac-Toe Game
      </Text>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        marginX={"auto"}
        paddingBottom={"10"}
        color={"white"}
        width={"650px"}
        height={"auto"}
      >
        <Box
          marginTop={"30"}
          boxShadow={"lg"}
          rounded={"lg"}
          padding={"10"}
          bg={"orange.300"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={"10"}
            gap={"20px"}
            fontSize={"2xl"}
          >
            <Box
              display={"inline"}
              padding={"4"}
              rounded={"md"}
              boxShadow={"lg"}
              bgColor={"dimgray"}
            >
              Win X : {xWin}
            </Box>
            <Box
              display={"inline"}
              padding={"4"}
              rounded={"md"}
              boxShadow={"lg"}
              bgColor={"dimgray"}
            >
              Draw : {draw}
            </Box>
            <Box
              display={"inline"}
              padding={"4"}
              rounded={"md"}
              boxShadow={"lg"}
              bgColor={"dimgray"}
            >
              Win O : {oWin}
            </Box>
          </Flex>
          <Board />
          <Button
            bgColor={"orange.400"}
            _hover={{ bgColor: "orange.200" }}
            width={"50"}
            marginTop={"10"}
            alignSelf={"flex-start"}
            height={"16"}
            onClick={() => dispatch(resetState())}
            fontSize={"2xl"}
            fontWeight={"semibold"}
            boxShadow={"md"}
          >
            <RepeatIcon marginRight={"2"} /> reset game
          </Button>
          <Button
            bgColor={"orange.400"}
            _hover={{ bgColor: "orange.200" }}
            width={"50"}
            marginLeft={"20"}
            marginTop={"10"}
            alignSelf={"flex-start"}
            height={"16"}
            onClick={() => dispatch(resetWin())}
            fontSize={"2xl"}
            fontWeight={"semibold"}
            boxShadow={"md"}
          >
            <RepeatIcon marginRight={"2"} /> reset winner
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every((square) => square !== null)) {
    return "draw";
  }

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
