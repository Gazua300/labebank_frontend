import styled from 'styled-components'


export const Container = styled.div`
	width: 40vw;
	margin: auto;
	margin-top: 10vh;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	padding: 10px;

	@media(max-width: 500px){
		width: 80vw;		
	}

	h3{
		text-align: center;
	}

	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
		input[type=date]{
			width: 30vw;	

			@media(max-width: 500px){
				width: 60vw;
			}
		}
		
		input{
			width: 30vw;

			@media(max-width: 500px){
				width: 60vw;
			}
		}
	}

	.input-container{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;		
	}

	input[type='button']{
		width: 100px;
		color: black;
		border-radius: 20px;
		width: 10vw;		

		&:hover{
			color:whitesmoke;
		}

		@media(max-width: 500px){
			width: 25vw;
		}
	}

	button{
		color: black;
		width: 100px;
		border-radius: 20px;
	}

`
