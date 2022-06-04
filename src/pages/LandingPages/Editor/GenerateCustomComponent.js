export const GenerateCustomComponent = (data) => {
    const svgText = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
        </svg>`;
    const svgLink = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
        </svg>`;
    const svgImage = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
        </svg>`;
    //most viewed resources
    var element = ``;
    var i = 0;
    for (i; i < 4; i++) {
        //console.log(data.resources[i]);
        element +=`
            <div class='col-sm-3'>
                <div class="card" style="width: 100%;height:auto">
                    <img class="card-img-top" style="height:140px" src="`+data.resources[i].thumbnail+`" alt="Card image cap">
                    <div class="card-body">
                        <b class="card-title" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">`+data.resources[i].resourceTitle+`</b></br>
                        <a href="`+data.resources[i].link+`" target='_blank' class="btn btn-warning">Download</a>
                    </div>
                </div>
            </div>
            `;
    }
    //salesrooms 
    var salesrooms_contents = ``;
    var i=0;
    for (i;i<3;i++){
        salesrooms_contents+=`
        <div class='col-sm-4'>
            <div class="card" style="width: 100%;height:auto">
                <img class="card-img-top" style="height:180px" src="`+data.salesrooms[i].thumbnail+`" alt="Card image cap">
                <div class="card-body">
                    <b class="card-title" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">`+data.salesrooms[i].title+`</b></br>
                    <small class="card-text" style="text-align:center;color:#505050;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">`+data.salesrooms[i].description+`</small><br/><br/>
                    <a href="#" class="btn btn-danger">Get Resources</a>
                </div>
            </div>
        </div>
        `;
    }
    const MostViewedResources = {
        id: 'most-viewed-resources',
        label: 'Most Viewed Resources',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `
            <div style="width:100%;background-color:#f1f1f1" class="py-3">
                <div class="container">
                    <div>
                        <center><h4>Most Viewed Resources</h4></center>
                        <div class='row'>
                            `+element+`
                        </div>
                    </div>
                </div>
            </div>
            `,
            style: {
                color: '#000000'
            }
        }
    };
    const Events = {
        id: 'events',
        label: 'Events',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `
            <div class="container mt-5 mb-5">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h4>Events</h4>
                    <ul class="timeline">
                        <li>
                            <a target="_blank" href="https://www.totoprayogo.com/#">New Web Design</a>
                            <a href="#" class="float-right">21 March, 2014</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula....</p>
                        </li>
                        <li>
                            <a href="#">21 000 Job Seekers</a>
                            <a href="#" class="float-right">4 March, 2014</a>
                            <p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                        </li>
                        <li>
                            <a href="#">Awesome Employers</a>
                            <a href="#" class="float-right">1 April, 2014</a>
                            <p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            `,
            style: {
                color: '#000000'
            }
        }
    };
    const Carousel = {
        id: 'carousel',
        label: 'Carousel',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `<h1>Salesrooms</h1>`,
            style: {
                color: '#000000'
            }
        }
    };
    const Header = {
        id: 'header',
        label: 'Header',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `
            <h1 class='display-3'>Enter Text Here</h1>
            `,
            style: {
                color: '#000000'
            }
        }
    };
    const Salesrooms = {
        id: 'salesrooms',
        label: 'Salesrooms',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `
            <div style="width:100%;background-color:#f1f1f1" class="py-3">
                <div class="container">
                    <div>
                        <center><h4>Salesrooms</h4></center>
                        <div class='row'>
                            `+salesrooms_contents+`
                        </div>
                    </div>
                </div>
            </div>
            `,
            style: {
                color: '#000000'
            }
        }
    }

    
    const ResourceSearchDownload = {
        id: 'resource-search-download',
        label: 'ResourceSearchDownload',
        media: svgImage,
        activate: true,
        content: {
            type: 'text',
            content: `
            <div style="width:100%;background-color:#f1f1f1" class="py-3 bg-light">
                <div class="container">
                    <div>
                        <div class='row'>
                            <div class='col-sm-4'>
                                <ol class="list-group list-group-numbered">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">Marketing</div>
                                            <small>Content for list item</small>
                                            </div>
                                        <span class="badge bg-primary rounded-pill">17</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">Products</div>
                                            <small>Content for list item</small>
                                            </div>
                                        <span class="badge bg-primary rounded-pill">19</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">New</div>
                                            <small>Content for list item</small>
                                            </div>
                                        <span class="badge bg-primary rounded-pill">13</span>
                                    </li>
                                </ol>
                            </div>
                            <div class="col-sm-8">
                                <div style="width:100%;background-color:white;padding:10px">
                                    <h4>Content List</h4>
                                    <ol class="list-group ">
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Action Scene</div>
                                                    <small class="badge bg-secondary rounded-pill">New</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">Upcomings</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">Old</small>&nbsp;
                                                </div>
                                            <a href='https://res.cloudinary.com/tellselling/image/upload/v1643828207/iijlxvqwd0m5hlowr7c8.jpg' target='_blank' class="badge bg-success rounded-pill">Get Resource</a>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">iMac 2021</div>
                                                    <small class="badge bg-secondary rounded-pill">another</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">Test</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">exam</small>&nbsp;
                                                </div>
                                            <a href="https://res.cloudinary.com/tellselling/image/upload/v1643828554/djwgqhvh6ezyxf6y6fok.jpg" class="badge bg-success rounded-pill">Get Resource</a>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Mirrorless Camera</div>
                                                    <small class="badge bg-secondary rounded-pill">upcomings</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">old</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">exam</small>&nbsp;
                                                </div>
                                            <a href="https://res.cloudinary.com/tellselling/image/upload/v1643828318/quamcxbus8lvzwdjpytw.jpg" class="badge bg-success rounded-pill">Get Resource</a>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Networking Solutions</div>
                                                    <small class="badge bg-secondary rounded-pill">new</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">old</small>&nbsp;
                                                    <small class="badge bg-secondary rounded-pill">exam</small>&nbsp;
                                                </div>
                                            <a href="https://res.cloudinary.com/tellselling/image/upload/v1643828486/wjxxgmnuino5rcxbmefo.jpg" class="badge bg-success rounded-pill">Get Resource</a>
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
            style: {
                color: '#000000'
            }
        }
    }
    const Components = [
        {
            id: 'text',
            label: 'Text',
            category: 'Basic',
            media: svgText,
            activate: true,
            content: {
                type: 'text',
                content: 'Insert your text here',
                style: { padding: '10px' },
            }
        }, {
            id: 'link',
            label: 'Custom',
            category: 'Basic',
            media: svgLink,
            activate: true,
            content: {
                type: 'link',
                content: 'Insert your link here',
                style: { color: '#d983a6' }
            }
        }, {
            id: 'image',
            label: 'Image',
            category: 'Basic',
            media: svgImage,
            activate: true,
            content: { type: 'image' }
        },
        //Inbuild componenets
        MostViewedResources,
        Header,
        Salesrooms,
        ResourceSearchDownload,
        Carousel,
        Events
    ];
    return Components;
}

