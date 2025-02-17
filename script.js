document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let brushColor = "#000";
    let brushSize = 5;
    let isErasing = false;

    // Selectors
    const colorPicker = document.getElementById("colorPicker");
    const brushSizeInput = document.getElementById("brushSize");
    const eraserButton = document.getElementById("eraser");
    const clearCanvasButton = document.getElementById("clearCanvas");
    const saveCanvasButton = document.getElementById("saveCanvas");

    // Event Listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    colorPicker.addEventListener("input", function () {
        brushColor = this.value;
        isErasing = false;
    });

    brushSizeInput.addEventListener("input", function () {
        brushSize = this.value;
    });

    eraserButton.addEventListener("click", function () {
        isErasing = !isErasing;
        eraserButton.textContent = isErasing ? "Drawing Mode" : "Eraser";
    });

    clearCanvasButton.addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    saveCanvasButton.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = isErasing ? "#fff" : brushColor;

        ctx.lineTo(
            e.clientX - canvas.getBoundingClientRect().left,
            e.clientY - canvas.getBoundingClientRect().top
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
            e.clientX - canvas.getBoundingClientRect().left,
            e.clientY - canvas.getBoundingClientRect().top
        );
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
});
